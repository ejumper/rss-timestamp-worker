# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cloudflare Worker that adds timestamps to RSS feeds from TikTok (via rss-bridge.org). It solves the problem of RSS feeds lacking proper publication dates by assigning and persisting timestamps to feed items.

## Development Commands

- `npm run dev` - Start local development server with Wrangler
- `npm run deploy` - Deploy worker to Cloudflare

## Architecture

### Core Components

**src/index.js** - Single-file worker containing all logic:

1. **FEED_CONFIGS** (lines 7-384)
   - Object mapping friendly names to TikTok RSS feed configurations
   - Each config includes: `url`, `cacheDuration`, `defaultAge`
   - Supports both predefined feeds and dynamic query parameter feeds

2. **fetch() handler** (lines 398-456)
   - Routes requests to predefined feeds (`/feedname`) or dynamic feeds (`?feed=URL`)
   - Returns processed RSS/Atom XML with added timestamps
   - Sets comprehensive HTTP headers including CORS and cache control

3. **processFeed()** (lines 459-528)
   - Implements 6-hour source caching to be polite to rss-bridge.org
   - Caches raw RSS XML in KV under `source_${cacheKey}` keys
   - Delegates to format-specific processors (RSS vs Atom)

4. **Format Processors**
   - `processRssFeed()` (lines 534-602) - Handles RSS 2.0 feeds, adds `<pubDate>` tags
   - `processAtomFeed()` (lines 604-672) - Handles Atom feeds, adds `<published>` tags
   - Both processors rewrite TikTok URLs to embeddable player URLs

5. **Timestamp Persistence**
   - `getKnownItems()` / `saveKnownItems()` - Read/write timestamp data to KV
   - Timestamps stored for 7 days (kvTTL) under feed-specific cache keys
   - Items without native timestamps get assigned times based on feed position

### Data Flow

1. Request arrives → Extract feed identifier (path or query param)
2. Check KV for cached source XML (6-hour TTL)
3. If cache miss → Fetch from rss-bridge.org → Cache in KV
4. Parse XML and extract items/entries
5. For each item:
   - Extract unique ID (guid/link/content hash)
   - Check KV for known timestamp
   - If new item → Assign timestamp based on position
   - Rewrite TikTok URLs to player URLs
6. Return processed XML with timestamps

### Cloudflare KV Storage

**wrangler.toml** configures KV namespace:
- Binding name: `RSS_TIMESTAMP_CACHE`
- Used for both source feed caching and timestamp persistence
- Two cache key patterns:
  - `source_${cacheKey}` - Cached RSS source XML (6-hour TTL)
  - `feed_${identifier}` - Item timestamp mappings (7-day TTL)

### Key Functions

- `convertToTikTokPlayerUrl()` - Transforms TikTok video URLs to embeddable player format
- `rewriteFeedSelfLink()` - Updates feed self-reference to worker URL
- `extractItemId()` / `extractAtomItemId()` - Generate stable identifiers for feed items
- `hashString()` - Simple hash for generating cache keys and item IDs
- `escapeXmlText()` / `escapeXmlAttribute()` - XML entity encoding

## Configuration

**DEFAULT_CONFIG** (lines 387-394):
- `kvTTL: 604800` - 7 days for timestamp data
- `sourceCacheTTL: 21600` - 6 hours for RSS source caching
- Cache TTL ranges are currently set to fixed 6-hour intervals

## Adding New Feeds

To add a new TikTok user feed to FEED_CONFIGS:
1. Add entry to FEED_CONFIGS object (alphabetically by username)
2. Use format: `'username': { url: 'rss-bridge-url', cacheDuration: 300, defaultAge: 3600 }`
3. Ensure username matches the key for consistency

## Important Implementation Notes

- The worker uses regex-based XML parsing (not a full XML parser) for performance
- Items are assigned timestamps in reverse chronological order (newest = current time, older items get earlier times)
- Duplicate keys exist in FEED_CONFIGS (e.g., 'scottpropandroll' at lines 9 and 294) - the last definition wins
- Empty username key exists at line 314 - should be removed or populated
- The caching strategy prioritizes being polite to upstream rss-bridge.org with 6-hour minimum refresh intervals
