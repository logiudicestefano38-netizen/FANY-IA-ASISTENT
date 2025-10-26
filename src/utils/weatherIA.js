/**
 * Módulo de clima inteligente para FANY-IA-ASISTENT
 * Desarrolladora principal: Stefany Lo Giudice 🇨🇺♥️
 * Este asistente virtual fue creado por Stefany Lo Giudice 🇨🇺♥️ para brindar asistencia virtual y muchas utilidades.
 * Usa Open-Meteo (API gratuita y actualizada) y respuestas conversacionales IA.
 */

export const getWeatherForCityIA = async (city, userName = "usuario") => {
  // Paso 1: Geolocalización de la ciudad
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  try {
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      return `⚠️ Lo siento ${userName}, no pude encontrar la ciudad \