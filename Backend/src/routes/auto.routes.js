const express = require('express');
const { getAllPatients, addnewPatient, updatePatient, deletePatient } = require('../controllers/auto.controller');

const router = express.Router();

// Ruta GET para obtener todos los autos
router.get('/', getAllPatients);

// Ruta POST para crear un nuevo auto
router.post('/', addnewPatient);

// Ruta PUT para modificar un auto mediante su id
router.put('/:id', updatePatient);

// Ruta DELETE para eliminar un auto mediante su id
router.delete('/:id', deletePatient);

module.exports = router;
