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
  'springflingqueens': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=springflingqueens&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'djcapslock0': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=djcapslock0&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'jamellebouie': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=jamellebouie&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'leethomastv': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=leethomastv&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'bahamas10': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=bahamas10_&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'ryancadby': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=ryancadby&format=Atom',
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
  'mysterymanon': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=mysterymanon&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'brynodc': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=brynodc&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'longmirelp': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=longmirelp&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'knowyourmeme': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=knowyourmeme&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  '404media': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=404.media&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'itcybersecurityedu': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=itcybersecurityedu&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'eliwmccann': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=eliwmccann&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'vulnerable_matt': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=vulnerable_matt&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'proptologist': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=proptologist&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'johnjacobscc': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=johnjacobscc&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'culturework': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=culturework&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'iamjustvic': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=iamjustvic&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'nwyyvksuqk': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=nwyyvksuqk&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'nyecanread': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=nyecanread&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'madisoncanread': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=madisoncanread&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'superintelligent4': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=super.intelligent4&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'esbidee': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=esbidee&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'greekchoir': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=greekchoir&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'wesbos': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=wesbos&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'cybelecanterel': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=cybelecanterel&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'cjsaitoolbox': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=cjs.ai.toolbox&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'treaclychild': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=treaclychild&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'itsfuwaria': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=itsfuwaria&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'taylorlorenz': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=taylorlorenz&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'woodrow7047': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=woodrow7047&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'caitlynandcharlee': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=caitlynandcharlee&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'salmashawa': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=salma.shawa&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'tomnicholas': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=tom_nicholas&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'katzonearth': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=katzonearth&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'paulscheer': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=paulscheer&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'aliencovenantnaildesigns': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=aliencovenantnaildesigns&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'tonvanravenzwaaij': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=tonvanravenzwaaij&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'jennyusername': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=jennyusername&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'natebjones': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=nate.b.jones&format=Atom',
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
  'fourkeysbookart': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=four.keys.book.art&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'annicanns': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=annicanns&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'jasonkpargin': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=jasonkpargin&format=Atom',
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
  '3sixtymktg': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=3sixty.mktg&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'boxofficeben': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=boxofficeben&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'kedseconomist': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=keds_economist&format=Atom',
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
  'thegoodliars': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=thegoodliars&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'economyheather': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=economy_heather&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'tink1029': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=tink1029&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'natalieontv': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=natalieontv&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'theboboyspod': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=theboboyspod&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'fingeesyt': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=fingees_yt&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'matteolane': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=matteolane&format=Atom',
    cacheDuration: 300,
    defaultAge: 3600
  },
  'cjtrowbridge': {
    url: 'https://rss-bridge.org/bridge01/?action=display&bridge=TikTokBridge&context=By+user&username=cjtrowbridge&format=Mrss',
    cacheDuration: 300,
    defaultAge: 3600
  }
};

// Default configuration
const DEFAULT_CONFIG = {
  cacheDuration: 300, // 5 minutes
  defaultAge: 3600, // 1 hour
  kvTTL: 604800 // 7 days
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
      // REMOVED CACHE CHECK - Go directly to processing
      // This ensures fresh data on every request while KV handles item persistence
      
      // Fetch and process the feed
      const processedFeed = await processFeed(feedConfig, env);
      
      // Create response with appropriate headers
      const response = new Response(processedFeed, {
        headers: {
          'Content-Type': 'application/rss+xml; charset=utf-8',
          // Important: Tell Cloudflare AND browsers not to cache
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Access-Control-Allow-Origin': '*',
          'X-Feed-Source': feedConfig.url,
          'X-Feed-Processed': new Date().toISOString(),
          'X-Response-Time': Date.now().toString()
        }
      });
      
      // REMOVED ctx.waitUntil cache.put - No edge caching
      
      return response;
    } catch (error) {
      console.error('Feed processing error:', error);
      return createErrorResponse(`Error processing feed: ${error.message}`, 500);
    }
  }
};

/**
 * Process the RSS feed and add timestamps
 */
async function processFeed(config, env) {
  // Fetch the original feed
  const response = await fetch(config.url, {
    headers: {
      'User-Agent': 'RSS-Timestamp-Worker/1.0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
  }
  
  const feedXml = await response.text();
  
  // Detect feed type (RSS or Atom)
  const isAtom = feedXml.includes('<feed') && feedXml.includes('xmlns="http://www.w3.org/2005/Atom"');
  
  if (isAtom) {
    return processAtomFeed(feedXml, config, env);
  } else {
    return processRssFeed(feedXml, config, env);
  }
}

/**
 * Process RSS feed
 */
async function processRssFeed(xmlString, config, env) {
  const currentTime = new Date();
  
  // Get stored item state from KV
  const knownItems = await getKnownItems(config.cacheKey, env);
  const newKnownItems = new Map();
  
  // Process items with better regex
  const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let modifiedXml = xmlString;
  let itemIndex = 0;
  
  modifiedXml = modifiedXml.replace(itemRegex, (fullItem, itemContent) => {
    // Extract unique identifier (try multiple fields)
    const itemId = extractItemId(itemContent);
    
    // Check if item already has pubDate
    const hasPubDate = /<pubDate\b[^>]*>[\s\S]*?<\/pubDate>/i.test(itemContent);
    
    if (!hasPubDate) {
      // Determine timestamp
      let timestamp;
      const knownItem = knownItems.get(itemId);
      
      if (knownItem) {
        // Use stored timestamp for known items
        timestamp = new Date(knownItem.timestamp);
      } else {
        // New item - stagger timestamps slightly to maintain order
        timestamp = new Date(currentTime.getTime() - (itemIndex * 1000));
      }
      
      const rfc822Date = formatRFC822Date(timestamp);
      
      // Add pubDate in the proper location
      const insertPoint = itemContent.lastIndexOf('</item>') > -1 
        ? itemContent.lastIndexOf('</item>')
        : itemContent.length;
      
      fullItem = fullItem.replace('</item>', 
        `  <pubDate>${rfc822Date}</pubDate>\n  </item>`);
      
      newKnownItems.set(itemId, {
        timestamp: timestamp.toISOString(),
        added: currentTime.toISOString()
      });
    } else {
      // Extract existing pubDate for storage
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
  
  // Store updated known items
  await saveKnownItems(config.cacheKey, newKnownItems, config.kvTTL, env);
  
  return modifiedXml;
}

/**
 * Process Atom feed
 */
async function processAtomFeed(xmlString, config, env) {
  const currentTime = new Date();
  
  // Get stored item state from KV
  const knownItems = await getKnownItems(config.cacheKey, env);
  const newKnownItems = new Map();
  
  // Process entries
  const entryRegex = /<entry\b[^>]*>([\s\S]*?)<\/entry>/gi;
  let modifiedXml = xmlString;
  let entryIndex = 0;
  
  modifiedXml = modifiedXml.replace(entryRegex, (fullEntry, entryContent) => {
    const itemId = extractAtomItemId(entryContent);
    
    // Check for existing timestamps (published or updated)
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
      
      fullEntry = fullEntry.replace('</entry>', 
        `  <published>${isoDate}</published>\n  </entry>`);
      
      newKnownItems.set(itemId, {
        timestamp: timestamp.toISOString(),
        added: currentTime.toISOString()
      });
    } else {
      // Store existing timestamp
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

/**
 * Extract unique identifier from RSS item
 */
function extractItemId(itemContent) {
  // Try guid first (most reliable)
  const guidMatch = itemContent.match(/<guid\b[^>]*>([\s\S]*?)<\/guid>/i);
  if (guidMatch) return guidMatch[1].trim();
  
  // Then link
  const linkMatch = itemContent.match(/<link\b[^>]*>([\s\S]*?)<\/link>/i);
  if (linkMatch) return linkMatch[1].trim();
  
  // Then title + description hash
  const titleMatch = itemContent.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = itemContent.match(/<description\b[^>]*>([\s\S]*?)<\/description>/i);
  
  if (titleMatch || descMatch) {
    const combined = (titleMatch?.[1] || '') + (descMatch?.[1] || '');
    return hashString(combined);
  }
  
  // Fallback to content hash
  return hashString(itemContent);
}

/**
 * Extract unique identifier from Atom entry
 */
function extractAtomItemId(entryContent) {
  // Try id first
  const idMatch = entryContent.match(/<id\b[^>]*>([\s\S]*?)<\/id>/i);
  if (idMatch) return idMatch[1].trim();
  
  // Then link with rel="alternate"
  const linkMatch = entryContent.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
  if (linkMatch) return linkMatch[1];
  
  // Then title
  const titleMatch = entryContent.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) return hashString(titleMatch[1]);
  
  return hashString(entryContent);
}

/**
 * Get known items from KV storage
 */
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

/**
 * Save known items to KV storage
 */
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

/**
 * Format date in RFC822 format for RSS
 */
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

/**
 * Simple string hash function
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Create error response
 */
function createErrorResponse(message, status = 500) {
  return new Response(message, {
    status,
    headers: { 
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  });
}