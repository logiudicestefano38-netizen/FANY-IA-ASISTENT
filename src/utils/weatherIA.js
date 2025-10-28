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
      return `⚠️ Lo siento ${userName}, no pude encontrar la ciudad "${city}". ¿Podrías verificar el nombre?`;
    }

    // Obtener coordenadas de la primera coincidencia
    const location = geoData.results[0];
    const { latitude, longitude, name, country } = location;

    // Paso 2: Obtener datos del clima usando Open-Meteo
    const weatherParams = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m',
      timezone: 'auto'
    });
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${weatherParams}`;
    
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      return `⚠️ ${userName}, no pude obtener los datos del clima para ${name}. Intenta de nuevo más tarde.`;
    }

    const current = weatherData.current;
    const temp = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m;
    const windDir = current.wind_direction_10m;
    const weatherCode = current.weather_code;

    // Interpretar el código del clima (WMO Weather interpretation codes)
    const weatherDescription = interpretWeatherCode(weatherCode);

    // Dirección del viento en texto
    const windDirection = getWindDirection(windDir);

    // Paso 3: Generar respuesta conversacional
    const response = `📍 **Clima en ${name}, ${country}**

🌡️ **Temperatura:** ${temp}°C
🌥️ **Condición:** ${weatherDescription}
💧 **Humedad:** ${humidity}%
💨 **Viento:** ${windSpeed} km/h desde el ${windDirection}

${getWeatherAdvice(temp, weatherCode, userName)}`;

    return response;

  } catch (error) {
    console.error("Error al obtener clima:", error);
    
    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return `⚠️ ${userName}, no pude conectarme al servicio de clima. Por favor, verifica tu conexión a internet.`;
    } else if (error.message.includes('JSON')) {
      return `⚠️ ${userName}, recibí una respuesta inválida del servicio de clima. Intenta nuevamente en unos momentos.`;
    }
    
    return `⚠️ ${userName}, hubo un problema al obtener el clima. Por favor, intenta nuevamente.`;
  }
};

/**
 * Interpreta los códigos WMO de clima
 * https://open-meteo.com/en/docs
 */
const interpretWeatherCode = (code) => {
  const weatherCodes = {
    0: "Cielo despejado",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna densa",
    56: "Llovizna helada ligera",
    57: "Llovizna helada densa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    66: "Lluvia helada ligera",
    67: "Lluvia helada intensa",
    71: "Nieve ligera",
    73: "Nieve moderada",
    75: "Nieve intensa",
    77: "Granizo",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos violentos",
    85: "Chubascos de nieve ligeros",
    86: "Chubascos de nieve intensos",
    95: "Tormenta eléctrica",
    96: "Tormenta con granizo ligero",
    99: "Tormenta con granizo intenso"
  };

  return weatherCodes[code] || "Condiciones variables";
};

/**
 * Convierte grados de dirección del viento a texto
 */
const getWindDirection = (degrees) => {
  const directions = [
    "Norte", "Noreste", "Este", "Sureste",
    "Sur", "Suroeste", "Oeste", "Noroeste"
  ];
  // Normalize degrees to 0-359 range
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalizedDegrees / 45) % 8;
  return directions[index];
};

/**
 * Proporciona consejos personalizados según el clima
 */
const getWeatherAdvice = (temp, weatherCode, userName) => {
  let advice = "";

  // Consejos por temperatura
  if (temp > 30) {
    advice = `¡Hace calor, ${userName}! 🌞 Mantente hidratado y busca la sombra.`;
  } else if (temp > 20) {
    advice = `El clima es agradable, ${userName}. 😊 Perfecto para salir.`;
  } else if (temp > 10) {
    advice = `Está un poco fresco, ${userName}. 🍂 Lleva una chaqueta ligera.`;
  } else {
    advice = `Hace frío, ${userName}! ❄️ Abrígate bien antes de salir.`;
  }

  // Consejos adicionales por condición del clima
  if (weatherCode >= 61 && weatherCode <= 67) {
    advice += " No olvides tu paraguas. ☔";
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    advice += " Ten cuidado con la nieve. ⛄";
  } else if (weatherCode >= 95) {
    advice += " ⚠️ Hay tormenta, mejor quédate en casa si puedes.";
  }

  return advice;
};