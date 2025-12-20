const express = require('express');
const Reserva = require('../models/Reserva');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protege todas las rutas siguientes con autenticación
router.use(authMiddleware);

// Listar todas las reservas del usuario autenticado
router.get('/', async (req, res) => {
  const reservas = await Reserva.find({ usuario: req.userId });
  res.json(reservas);
});

// Crear nueva reserva
router.post('/', async (req, res) => {
  const { fecha, sala, hora } = req.body;

  //condicion obligatorio sala
  if(!sala || !["A", "B", "C"].includes(sala)){
    return res.status(400).json({msg: "Sala inválida."});
  }

  // Validar formato de hora: debe ser 12 horas con AM/PM (ej: "03:30 PM")
  const formatoHora12Regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM|am|pm)$/;
  
  if (!hora || !formatoHora12Regex.test(hora)) {
    return res.status(400).json({
      msg: "Formato de hora inválido. Debe ser en formato 12 horas con AM/PM (ej: 03:30 PM)"
    });
  }

  // Validar que no sea domingo
  const fechaObj = new Date(fecha);
  if (fechaObj.getDay() === 0) {
    return res.status(400).json({
      msg: "No se permiten reservas los domingos"
    });
  }

  const nueva = new Reserva({
    usuario: req.userId,
    fecha,
    sala,
    hora
  });

  await nueva.save();
  res.status(201).json(nueva);
});

// Eliminar una reserva (solo si pertenece al usuario)
router.delete('/:id', async (req, res) => {
  const resultado = await Reserva.deleteOne({ _id: req.params.id, usuario: req.userId });

//si no se eliminó ninguna reserva, significa que no existía o no pertenecía al usuario
if (resultado.deletedCount === 0) {
    return res.status(404).json({ msg: 'Reserva no encontrada' });
}
  res.json({ msg: 'Reserva cancelada' });
});

module.exports = router;