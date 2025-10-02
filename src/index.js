/**
 * Cloudflare Worker for adding timestamps to RSS feeds
 * Supports both dynamic feeds via query params and predefined feed configurations
 */

// Configuration: Add your specific RSS feeds here
const FEED_CONFIGS = {
  // TikTok feeds - organized alphabetically by username
  'scottpropandroll': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=scottpropandroll&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'vibestvita': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=vibesestvida&format=Atom'
    cacheDuration: 300,
    defaultAge: 3600
  },
  'cjtrowbridge': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=cjtrowbridge&format=Atom'
    cacheDuration: 300,
    defaultAge: 3600
  },
   'alexianadfry': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=alexianadfry&format=Atom'
    cacheDuration: 300,
    defaultAge: 3600
  },
  'vulnerable_matt': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=vulnerable_matt&format=Atom'
    cacheDuration: 300,
    defaultAge: 3600
  },
  'chiara.codes': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=chiara.codes&format=Atom'
    cacheDuration: 300,
    defaultAge: 3600
  },
  'jamellebouie': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=jamellebouie&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'mlgonzo': {
  url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=mlgonzo1&format=Atom'
  cacheDuration: 300,
    defaultAge: 3600
  },
  'bahamas10': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=bahamas10_&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'econwithsarah': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=econwithsarah&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'dearmodern': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=dearmodern&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'addielamarr': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=addielamarr&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'divasunglasses': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=divasunglasses&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'longmirelp': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=longmirelp&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'eliwmccann': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=eliwmccann&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'culturework': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=culturework&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'nyecanread': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=nyecanread&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'esbidee': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=esbidee&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'cybelecanterel': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=cybelecanterel&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'cjsaitoolbox': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=cjs.ai.toolbox&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'caitlynandcharlee': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=caitlynandcharlee&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'salmashawa': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=salma.shawa&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'katzonearth': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=katzonearth&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'jennyusername': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=jennyusername&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'molesrcool': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=molesrcool&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'thisweekinlinux': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=thisweekinlinux&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'danieltosh': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=danieltosh&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'annicanns': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=annicanns&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'zigurdmednieks': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=zigurdmednieks&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'remodelschool': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=remodelschool&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'boxofficeben': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=boxofficeben&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'heathercoxrichardson': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=heathercoxrichardson&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'prettyweirdg0rl': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=prettyweirdg0rl&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'realrajmuhar': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=realrajmuhar&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'economyheather': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=economy_heather&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'tink1029': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=tink1029&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'natalieontv': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=natalieontv&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'mayor_wren': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=mayor_wren&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
 'ConnerOmalley': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=conner_omalley_&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
};

// Default configuration
const DEFAULT_CONFIG = {
  cacheDuration: 300, // Not used currently, but kept for future use
  defaultAge: 3600,   // Not used currently, but kept for future use
  kvTTL: 604800,      // 7 days for timestamp data
  sourceCacheTTL: 86400, // Base 24 hours for RSS source data
  sourceCacheTTLMin: 22 * 3600, // Minimum: 22 hours 
  sourceCacheTTLMax: 26 * 3600  // Maximum: 26 hours
};

// Add this at the very top of your index.js, replacing just the fetch function

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Check for predefined feed by path
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const feedName = pathSegments[0];
    
    let feedConfig;
    
    if (feedName && FEED_CONFIGS[feedName]) {
      // Use predefined feed configuration
      feedConfig = {
        ...DEFAULT_CONFIG,
        ...FEED_CONFIGS[feedName],
        cacheKey: `feed_${feedName}`
      };
    } else {
      // Fall back to query parameter mode
      const feedUrl = url.searchParams.get('feed');
      
      if (!feedUrl) {
        return createErrorResponse(
          'Usage:\n' +
          '1. Predefined feeds: https://your-worker.dev/feedname\n' +
          '2. Dynamic feeds: https://your-worker.dev/?feed=RSS_URL',
          400
        );
      }
      
      feedConfig = {
        ...DEFAULT_CONFIG,
        url: feedUrl,
        cacheKey: `feed_${hashString(feedUrl)}`
      };
    }
    
    try {
      const processedFeed = await processFeed(feedConfig, env);
      const response = new Response(processedFeed, {
        headers: {
          'Content-Type': 'application/rss+xml; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Access-Control-Allow-Origin': '*',
          'X-Feed-Source': feedConfig.url,
          'X-Feed-Processed': new Date().toISOString(),
          'X-Response-Time': Date.now().toString()
        }
      });
      return response;
    } catch (error) {
      console.error('Feed processing error:', error);
      return createErrorResponse(`Error processing feed: ${error.message}`, 500);
    }
  }
};

// MODIFIED: This is the key function that now implements 24-hour caching
async function processFeed(config, env) {
  // Check for cached source feed first
  const sourceCacheKey = `source_${config.cacheKey}`;
  let feedXml = null;
  let fromCache = false;

  if (env.RSS_TIMESTAMP_CACHE) {
    try {
      const cached = await env.RSS_TIMESTAMP_CACHE.get(sourceCacheKey, { type: 'json' });
      if (cached && cached.content && cached.timestamp) {
        const cacheAge = Date.now() - cached.timestamp;
        
        // If cache is less than 26 hours old (max TTL), use it
        if (cacheAge < config.sourceCacheTTLMax * 1000) {
          feedXml = cached.content;
          fromCache = true;
          console.log(`Using cached RSS source for ${config.cacheKey}, age: ${Math.floor(cacheAge/1000/60)} minutes`);
        }
      }
    } catch (error) {
      console.error('Error reading source cache:', error);
    }
  }

  // If no valid cache, fetch fresh data from rss-bridge.org
  if (!feedXml) {
    console.log(`Fetching fresh RSS source for ${config.cacheKey} from rss-bridge.org`);
    
    const response = await fetch(config.url, {
      headers: {
        'User-Agent': 'RSS-Timestamp-Worker/1.0 (Polite 24h cache)'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
    }

    feedXml = await response.text();

    // Cache the source feed for 22-26 hours (randomized to stagger requests)
    if (env.RSS_TIMESTAMP_CACHE) {
      try {
        // Generate a random TTL between 22-26 hours to stagger requests
        const randomTTL = Math.floor(
          Math.random() * (config.sourceCacheTTLMax - config.sourceCacheTTLMin) + config.sourceCacheTTLMin
        );
        const hoursFromNow = (randomTTL / 3600).toFixed(1);

        await env.RSS_TIMESTAMP_CACHE.put(sourceCacheKey, JSON.stringify({
          content: feedXml,
          timestamp: Date.now()
        }), {
          expirationTtl: randomTTL
        });
        console.log(`Cached RSS source for ${config.cacheKey} for ${hoursFromNow} hours (randomized)`);
      } catch (error) {
        console.error('Error caching source feed:', error);
      }
    }
  }

  // Now process the RSS XML (either cached or fresh) to add timestamps
  const isAtom = feedXml.includes('<feed') && feedXml.includes('xmlns="http://www.w3.org/2005/Atom"');
  if (isAtom) {
    return processAtomFeed(feedXml, config, env);
  } else {
    return processRssFeed(feedXml, config, env);
  }
}

// All your existing functions remain the same:
// processRssFeed, processAtomFeed, extractItemId, extractAtomItemId,
// getKnownItems, saveKnownItems, formatRFC822Date, hashString, createErrorResponse

async function processRssFeed(xmlString, config, env) {
  const currentTime = new Date();
  const knownItems = await getKnownItems(config.cacheKey, env);
  const newKnownItems = new Map();

  const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let modifiedXml = xmlString;
  let itemIndex = 0;

  modifiedXml = modifiedXml.replace(itemRegex, (fullItem, itemContent) => {
    const itemId = extractItemId(itemContent);
    const hasPubDate = /<pubDate\b[^>]*>[\s\S]*?<\/pubDate>/i.test(itemContent);

    if (!hasPubDate) {
      let timestamp;
      const knownItem = knownItems.get(itemId);
      if (knownItem) {
        timestamp = new Date(knownItem.timestamp);
      } else {
        timestamp = new Date(currentTime.getTime() - (itemIndex * 1000));
      }

      const rfc822Date = formatRFC822Date(timestamp);
      fullItem = fullItem.replace(
        '</item>',
        `  <pubDate>${rfc822Date}</pubDate>\n  </item>`
      );

      newKnownItems.set(itemId, {
        timestamp: timestamp.toISOString(),
        added: currentTime.toISOString()
      });
    } else {
      const pubDateMatch = itemContent.match(/<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i);
      if (pubDateMatch) {
        newKnownItems.set(itemId, {
          timestamp: new Date(pubDateMatch[1]).toISOString(),
          added: knownItems.get(itemId)?.added || currentTime.toISOString()
        });
      }
    }

    itemIndex++;
    return fullItem;
  });

  await saveKnownItems(config.cacheKey, newKnownItems, config.kvTTL, env);
  return modifiedXml;
}

async function processAtomFeed(xmlString, config, env) {
  const currentTime = new Date();
  const knownItems = await getKnownItems(config.cacheKey, env);
  const newKnownItems = new Map();

  const entryRegex = /<entry\b[^>]*>([\s\S]*?)<\/entry>/gi;
  let modifiedXml = xmlString;
  let entryIndex = 0;

  modifiedXml = modifiedXml.replace(entryRegex, (fullEntry, entryContent) => {
    const itemId = extractAtomItemId(entryContent);
    const hasTimestamp = /<(published|updated)\b[^>]*>[\s\S]*?<\/(published|updated)>/i.test(entryContent);

    if (!hasTimestamp) {
      let timestamp;
      const knownItem = knownItems.get(itemId);
      if (knownItem) {
        timestamp = new Date(knownItem.timestamp);
      } else {
        timestamp = new Date(currentTime.getTime() - (entryIndex * 1000));
      }

      const isoDate = timestamp.toISOString();
      fullEntry = fullEntry.replace(
        '</entry>',
        `  <published>${isoDate}</published>\n  </entry>`
      );

      newKnownItems.set(itemId, {
        timestamp: timestamp.toISOString(),
        added: currentTime.toISOString()
      });
    } else {
      const timestampMatch = entryContent.match(/<(published|updated)\b[^>]*>([\s\S]*?)<\/(published|updated)>/i);
      if (timestampMatch) {
        newKnownItems.set(itemId, {
          timestamp: new Date(timestampMatch[2]).toISOString(),
          added: knownItems.get(itemId)?.added || currentTime.toISOString()
        });
      }
    }

    entryIndex++;
    return fullEntry;
  });

  await saveKnownItems(config.cacheKey, newKnownItems, config.kvTTL, env);
  return modifiedXml;
}

function extractItemId(itemContent) {
  const guidMatch = itemContent.match(/<guid\b[^>]*>([\s\S]*?)<\/guid>/i);
  if (guidMatch) return guidMatch[1].trim();

  const linkMatch = itemContent.match(/<link\b[^>]*>([\s\S]*?)<\/link>/i);
  if (linkMatch) return linkMatch[1].trim();

  const titleMatch = itemContent.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = itemContent.match(/<description\b[^>]*>([\s\S]*?)<\/description>/i);
  if (titleMatch || descMatch) {
    const combined = (titleMatch?.[1] || '') + (descMatch?.[1] || '');
    return hashString(combined);
  }

  return hashString(itemContent);
}

function extractAtomItemId(entryContent) {
  const idMatch = entryContent.match(/<id\b[^>]*>([\s\S]*?)<\/id>/i);
  if (idMatch) return idMatch[1].trim();

  const linkMatch = entryContent.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
  if (linkMatch) return linkMatch[1];

  const titleMatch = entryContent.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) return hashString(titleMatch[1]);

  return hashString(entryContent);
}

async function getKnownItems(cacheKey, env) {
  if (!env.RSS_TIMESTAMP_CACHE) {
    console.log('KV namespace RSS_TIMESTAMP_CACHE not configured');
    return new Map();
  }

  try {
    const stored = await env.RSS_TIMESTAMP_CACHE.get(cacheKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    }
  } catch (error) {
    console.error('Error reading from KV:', error);
  }

  return new Map();
}

async function saveKnownItems(cacheKey, items, ttl, env) {
  if (!env.RSS_TIMESTAMP_CACHE) {
    console.log('KV namespace RSS_TIMESTAMP_CACHE not configured');
    return;
  }

  try {
    const toStore = Object.fromEntries(items);
    await env.RSS_TIMESTAMP_CACHE.put(cacheKey, JSON.stringify(toStore), {
      expirationTtl: ttl
    });
  } catch (error) {
    console.error('Error saving to KV:', error);
  }
}

function formatRFC822Date(date) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function createErrorResponse(message, status = 500) {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  });
}