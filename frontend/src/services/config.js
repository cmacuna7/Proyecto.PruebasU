// Configuración de API para desarrollo y producción

// URL del backend - usa variable de entorno o fallback
export const API_BASE_URL = '/api';

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
