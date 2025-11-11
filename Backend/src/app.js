const express = require('express');
const autoRoutes = require('./routes/auto.routes');

const app = express(); // Crea una instancia de la aplicación Express

// Middleware para parsear JSON del cuerpo de las solicitudes
app.use(express.json());

// Rutas Base de cada modelo
app.use('/api/autos', autoRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Exportamos app para poder usarla en tests o en un archivo de servidor separado
module.exports = app;
