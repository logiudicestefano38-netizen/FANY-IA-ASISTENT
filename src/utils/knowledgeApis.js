// Pequeñas utilidades para obtener contexto de fuentes públicas sin clave
export async function duckDuckGoInstantAnswer(query) {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('DDG no OK');
    const data = await res.json();
    let text = '';
    if (data.AbstractText) text = data.AbstractText;
    else if (data.RelatedTopics && data.RelatedTopics.length) {
      const rt = data.RelatedTopics[0];
      text = rt.Text || (rt.Topics && rt.Topics[0] && rt.Topics[0].Text) || '';
    }
    return text || null;
  } catch (e) {
    console.warn('duckDuckGoInstantAnswer failed', e);
    return null;
  }
}

export async function wikipediaSummary(query) {
  try {
    const api = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const res = await fetch(api);
    if (!res.ok) {
      // Try search endpoint
      const s = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
      const rs = await fetch(s);
      if (!rs.ok) return null;
      const sd = await rs.json();
      const first = sd.query?.search?.[0]?.title;
      if (!first) return null;
      const r2 = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(first)}`);
      if (!r2.ok) return null;
      const d2 = await r2.json();
      return d2.extract || null;
    }
    const data = await res.json();
    return data.extract || null;
  } catch (e) {
    console.warn('wikipediaSummary failed', e);
    return null;
  }
}

export async function geocodeNominatim(place) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'es' } });
    if (!res.ok) throw new Error('geocode failed');
    const data = await res.json();
    if (!data || data.length === 0) return null;
    return { lat: data[0].lat, lon: data[0].lon, display_name: data[0].display_name };
  } catch (e) {
    console.warn('geocodeNominatim failed', e);
    return null;
  }
}

export async function getWeatherByCoords(lat, lon) {
  try {
    // Open-Meteo: no key, simple current weather
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current_weather=true&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('open-meteo failed');
    const data = await res.json();
    return data.current_weather || null;
  } catch (e) {
    console.warn('getWeatherByCoords failed', e);
    return null;
  }
}

// Higher-level helper that tries a few sources and returns a short context string
export async function fetchKnowledgeContext(query) {
  const parts = [];
  const ddg = await duckDuckGoInstantAnswer(query);
  if (ddg) parts.push(`DuckDuckGo: ${ddg}`);
  const wiki = await wikipediaSummary(query);
  if (wiki) parts.push(`Wikipedia: ${wiki}`);
  // If query looks like a location, try weather briefly
  if (/\b(clima|tiempo|temperatura|hoy)\b/i.test(query)) {
    const geo = await geocodeNominatim(query.replace(/clima|tiempo|hoy/gi, '').trim() || query);
    if (geo) {
      const w = await getWeatherByCoords(geo.lat, geo.lon);
      if (w) parts.push(`Clima (${geo.display_name}): ${w.temperature}°C, viento ${w.windspeed} m/s, ${w.weathercode ?? ''}`);
    }
  }
  if (parts.length === 0) return null;
  return parts.join('\n').substring(0, 1200);
}
