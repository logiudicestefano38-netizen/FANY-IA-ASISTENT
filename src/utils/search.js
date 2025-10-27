// Import weather module
import { getWeatherForCityIA } from './weatherIA.js';

// Web search utility for Fany IA
export const searchWeb = async (query) => {
  try {
    // Use websim's search capability if available
    if (window.websim?.search) {
      const results = await window.websim.search(query);
      return results;
    }
    
    // Fallback: simulate search with AI knowledge
    const response = await window.websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Proporciona información actualizada y precisa sobre el tema consultado. Responde como si hubieras buscado en internet."
        },
        {
          role: "user",
          content: `Busca información sobre: ${query}`
        }
      ]
    });
    
    return {
      results: [{
        title: "Resultado de búsqueda",
        snippet: response.content,
        url: "#"
      }]
    };
  } catch (error) {
    console.error("Search error:", error);
    return { results: [] };
  }
};

// IndexedDB setup for caching search results
const DB_NAME = 'fany_comandos_db';
const DB_VERSION = 1;
const STORE_NAME = 'comandos';

let db = null;

const initDB = async () => {
  if (db) return db;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        const store = event.target.transaction.objectStore(STORE_NAME);
        store.createIndex('consulta', 'consulta', { unique: false });
      }
    };
  });
};

// Store search results
const guardarResultado = async (consulta, resultado) => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await store.add({ consulta, resultado, fecha: new Date().toISOString() });
  } catch (e) {
    console.warn('Error guardando resultado:', e);
  }
};

// Query local database
const consultarBase = async (consulta) => {
  try {
    const database = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('consulta');
      const request = index.getAll(consulta);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('Error consultando base:', e);
    return [];
  }
};

// Command detection and execution
export const ejecutarComando = (texto) => {
  const lower = texto.toLowerCase();
  
  let city = null;
  
  if (lower.includes('modo sin filtro')) {
      return { 
          tipo: 'no_filter', 
          icono: '🔓', 
          accion: 'Activando modo sin filtro...',
          data: {}
      };
  }

  if (lower.includes('clima') || lower.includes('tiempo') || lower.includes('temperatura')) {
    // Basic city extraction attempt (e.g., "clima en miami" or "dame el tiempo de orlando")
    const match = /(clima|tiempo|temperatura)\s+(en|de|para)\s+([a-z\s]+)/.exec(lower);
    if (match && match[3]) {
        // Try to get the city name from the captured group
        city = match[3].trim();
        // Simple heuristic to remove generic words like "hoy" or "mi ciudad"
        city = city.replace(/^(el|la|mi|tu)\s+/g, '').replace(/\s+(de|hoy)$/g, '').trim();
    } else if (lower.includes('clima')) {
        // Fallback: If no city is specified, assume a default location reflecting user's context (Florida)
        city = 'Miami, FL'; 
    }
    
    return { 
        tipo: 'clima', 
        icono: '☀️', 
        accion: city ? `Obteniendo información del clima para ${city}...` : 'Obteniendo información del clima.',
        data: { city }
    };
  } else if (lower.includes('noticia') || lower.includes('actualidad') || lower.includes('hoy')) {
    return { tipo: 'noticias', icono: '📰', accion: 'Buscando noticias recientes...' };
  } else if (lower.includes('wikipedia') || lower.includes('definición') || lower.includes('qué es')) {
    return { tipo: 'wikipedia', icono: '📚', accion: 'Consultando Wikipedia...' };
  } else if (lower.includes('salud') || lower.includes('síntoma') || lower.includes('enfermedad')) {
    return { tipo: 'salud', icono: '🧬', accion: 'Buscando información de salud...' };
  } else {
    return { tipo: 'general', icono: '🔍', accion: 'Realizando búsqueda...' };
  }
};

// Enhanced search with local caching and command detection
export const buscarConComandos = async (query) => {
  const comando = ejecutarComando(query);
  console.log(`${comando.icono} ${comando.accion}`);
  
  if (comando.tipo === 'clima') {
      const cityQuery = comando.data?.city || 'Miami, FL';
      // Use the new weatherIA module for better, free weather data
      const weatherText = await getWeatherForCityIA(cityQuery);
      
      const results = [{
          title: `Reporte de Clima`,
          snippet: weatherText,
          url: '#'
      }];
      
      // We don't cache weather data, it should always be fresh.
      return {
          fromCache: false, 
          command: comando,
          results: results
      };
  }
  
  // Check local database first
  const datosGuardados = await consultarBase(query);
  if (datosGuardados.length > 0) {
    console.log('📂 Resultados encontrados en base de datos local');
    return {
      fromCache: true,
      command: comando,
      results: datosGuardados.map(d => ({
        title: 'Resultado guardado',
        snippet: d.resultado,
        url: d.resultado.includes('http') ? d.resultado : '#',
        fecha: d.fecha
      }))
    };
  }
  
  // Search online if not in cache
  console.log('🕵️ No hay datos guardados. Buscando en línea...');
  const searchResults = await searchWeb(query);
  
  // Save results to local database
  if (searchResults.results && searchResults.results.length > 0) {
    for (const result of searchResults.results) {
      await guardarResultado(query, `${result.title} - ${result.snippet} ${result.url}`);
    }
  }
  
  return {
    fromCache: false,
    command: comando,
    results: searchResults.results || []
  };
};