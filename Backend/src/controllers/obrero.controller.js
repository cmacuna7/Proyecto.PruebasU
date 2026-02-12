const Obrero = require('../models/obrero.model');

const HOURLY_RATE = 10;

async function createObrero(req, res) {
    try {
        const { nombreCompleto, horasTrabajadas } = req.body;

        if (!nombreCompleto || typeof horasTrabajadas !== 'number') {
            return res.status(400).json({ message: 'Nombre y horas trabajadas (número) son requeridos' });
        }

        if (horasTrabajadas < 0) {
            return res.status(400).json({ message: 'Las horas trabajadas no pueden ser negativas' });
        }

        const newObrero = new Obrero({
            nombreCompleto,
            horasTrabajadas
        });

        await newObrero.save();
        res.status(201).json(newObrero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllObreros(req, res) {
    try {
        const obreros = await Obrero.find();
        res.json(obreros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getObreroById(req, res) {
    try {
        const { id } = req.params;
        const obrero = await Obrero.findById(id);
        if (!obrero) return res.status(404).json({ message: 'Obrero no encontrado' });
        res.json(obrero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function calculateSalary(hours) {
    return hours * HOURLY_RATE;
}

async function getSalarioObrero(req, res) {
    try {
        const { id } = req.params;
        const obrero = await Obrero.findById(id);

        if (!obrero) {
            return res.status(404).json({ message: 'Obrero no encontrado' });
        }

        const salario = calculateSalary(obrero.horasTrabajadas);
        res.json({
            id: obrero._id, // Explicitly using _id but toJSON handles it usually
            nombreCompleto: obrero.nombreCompleto,
            horasTrabajadas: obrero.horasTrabajadas,
            salario: salario
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateObrero(req, res) {
    try {
        const { id } = req.params;
        const { nombreCompleto, horasTrabajadas } = req.body;

        const obrero = await Obrero.findById(id);
        if (!obrero) return res.status(404).json({ message: 'Obrero no encontrado' });

        if (horasTrabajadas !== undefined) {
            if (typeof horasTrabajadas !== 'number' || horasTrabajadas < 0) {
                return res.status(400).json({ message: 'Las horas trabajadas deben ser un número positivo' });
            }
            obrero.horasTrabajadas = horasTrabajadas;
        }

        if (nombreCompleto !== undefined) obrero.nombreCompleto = nombreCompleto;

        await obrero.save();
        res.json(obrero);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteObrero(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Obrero.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Obrero no encontrado' });
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createObrero, getAllObreros, getObreroById, getSalarioObrero, updateObrero, deleteObrero };
