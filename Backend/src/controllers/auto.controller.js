const Auto = require('../models/auto.model');
const MAX_YEAR = new Date().getFullYear() + 1;

function validateYear(anio) {
    const yearNum = Number(anio);
    return !isNaN(yearNum) && yearNum >= 1900 && yearNum <= MAX_YEAR ? yearNum : null;
}

async function getAllAutos(req, res) {
    try {
        const autos = await Auto.find();
        res.json(autos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAutoById(req, res) {
    try {
        const { id } = req.params;
        // Check if id is a valid ObjectId if using default _id, but we might be using auto-increment or just keeping it simple.
        // Mongoose generic findById expects ObjectId. The previous implementation used numeric IDs.
        // MongoDB uses ObjectId by default. We should probably stick to ObjectId for new entries.
        // However, if we want to maintain the numeric ID behavior, we'd need a counter collection.
        // For simplicity in migration, standard MongoDB ObjectId is better. 
        // We will assume the frontend can handle string IDs (which it should).

        const auto = await Auto.findById(id);
        if (!auto) return res.status(404).json({ message: 'Auto no encontrado' });
        res.json(auto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function addNewAuto(req, res) {
    try {
        const { marca, modelo, anio, color, numeroSerie } = req.body; // Changed año to anio to match model if needed, but model has 'anio'
        // frontend sends 'anio' or 'año'? 
        // Model has 'anio'. Controller input 'año'.

        const anioVal = req.body.año || req.body.anio;

        if (!marca || !modelo || !anioVal || !color || !numeroSerie) {
            return res.status(400).json({ message: 'Marca, Modelo, Año, Color y Número de Serie son requeridos' });
        }

        const yearNum = validateYear(anioVal);
        if (!yearNum) return res.status(400).json({ message: 'Año debe ser un número válido entre 1900 y ' + MAX_YEAR });

        const existingAuto = await Auto.findOne({ numeroSerie: String(numeroSerie).trim().toUpperCase() });
        if (existingAuto) return res.status(400).json({ message: 'El número de serie ya existe' });

        const newAuto = new Auto({
            marca: String(marca).trim(),
            modelo: String(modelo).trim(),
            anio: yearNum, // Model uses 'anio'
            color: String(color).trim(),
            numeroSerie: String(numeroSerie).trim().toUpperCase()
        });

        await newAuto.save();
        res.status(201).json({ message: 'Auto creado exitosamente', data: newAuto });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateAuto(req, res) {
    try {
        const { id } = req.params;
        const { marca, modelo, anio, color, numeroSerie } = req.body;

        const anioVal = req.body.año || req.body.anio;

        const auto = await Auto.findById(id);
        if (!auto) return res.status(404).json({ message: 'Auto no encontrado' });

        if (anioVal !== undefined) {
            const yearNum = validateYear(anioVal);
            if (!yearNum) return res.status(400).json({ message: 'Año debe ser un número válido entre 1900 y ' + MAX_YEAR });
            auto.anio = yearNum;
        }

        if (numeroSerie !== undefined) {
            const serieClean = String(numeroSerie).trim().toUpperCase();
            if (serieClean !== auto.numeroSerie) {
                const existing = await Auto.findOne({ numeroSerie: serieClean });
                if (existing) return res.status(400).json({ message: 'El número de serie ya existe' });
                auto.numeroSerie = serieClean;
            }
        }

        if (marca !== undefined) auto.marca = String(marca).trim();
        if (modelo !== undefined) auto.modelo = String(modelo).trim();
        if (color !== undefined) auto.color = String(color).trim();

        await auto.save();
        res.json({ message: 'Auto actualizado exitosamente', data: auto });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteAuto(req, res) {
    try {
        const { id } = req.params;
        const deletedAuto = await Auto.findByIdAndDelete(id);
        if (!deletedAuto) return res.status(404).json({ message: 'Auto no encontrado' });

        res.json({
            message: 'Auto eliminado exitosamente',
            data: deletedAuto
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function _clearAutos() {
    await Auto.deleteMany({});
}

module.exports = { getAllAutos, getAutoById, addNewAuto, updateAuto, deleteAuto, _clearAutos };
