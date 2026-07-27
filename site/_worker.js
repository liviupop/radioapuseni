const DEFAULT_AZURACAST_HOST = "stream.radioapuseni.ro";
const FEED_CACHE_SECONDS = 300;

function jsonError(message, status) {
  return Response.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      }
    }
  );
}

function validateFeedUrl(rawUrl, allowedHost) {
  if (!rawUrl) throw new Error("Lipsește parametrul url.");

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error("URL-ul feed-ului nu este valid.");
  }

  if (parsed.protocol !== "https:") {
    throw new Error("Feed-ul trebuie să folosească HTTPS.");
  }
  if (parsed.hostname !== allowedHost) {
    throw new Error("Hostul feed-ului nu este autorizat.");
  }
  if (parsed.username || parsed.password) {
    throw new Error("URL-urile cu credențiale nu sunt permise.");
  }

  return parsed;
}

async function proxyFeed(request, env, ctx) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonError("Metodă nepermisă.", 405);
  }

  const requestUrl = new URL(request.url);
  const allowedHost = env.AZURACAST_HOST || DEFAULT_AZURACAST_HOST;

  let upstreamUrl;
  try {
    upstreamUrl = validateFeedUrl(requestUrl.searchParams.get("url"), allowedHost);
  } catch (error) {
    return jsonError(error.message, 400);
  }

  const normalizedCacheUrl = new URL("/api/feed", requestUrl.origin);
  normalizedCacheUrl.searchParams.set("url", upstreamUrl.href);
  const cacheKey = new Request(normalizedCacheUrl, { method: "GET" });
  const edgeCache = globalThis.caches?.default;

  if (request.method === "GET" && edgeCache) {
    const cached = await edgeCache.match(cacheKey);
    if (cached) return cached;
  }

  let upstream;
  try {
    upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers: {
        "Accept": "application/rss+xml, application/xml, text/xml;q=0.9"
      },
      redirect: "manual"
    });
  } catch {
    return jsonError("Feed-ul AzuraCast nu este disponibil.", 502);
  }

  if (!upstream.ok) {
    return jsonError(`Feed-ul AzuraCast a răspuns cu ${upstream.status}.`, 502);
  }

  const contentType = upstream.headers.get("Content-Type") || "";
  if (!/(rss|atom|xml)/i.test(contentType)) {
    return jsonError("Răspunsul AzuraCast nu este un feed XML.", 502);
  }

  const response = new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": `public, max-age=60, s-maxage=${FEED_CACHE_SECONDS}`,
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff"
    }
  });

  if (request.method === "GET" && edgeCache) {
    ctx.waitUntil(edgeCache.put(cacheKey, response.clone()));
  }

  return response;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/feed") {
      return proxyFeed(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  }
};
