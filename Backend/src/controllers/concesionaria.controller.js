const Concesionaria = require('../models/concesionaria.model');

async function getAllConcesionarias(req, res) {
    try {
        const concesionarias = await Concesionaria.find();
        res.json(concesionarias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function validateConcesionariaData(data, concesionariaId = null) {
    const { nombre, direccion, telefono, ciudad, gerente } = data;

    if (!nombre || !direccion || !telefono || !ciudad || !gerente) {
        return 'Nombre, Dirección, Teléfono, Ciudad y Gerente son requeridos';
    }

    if (nombre.trim() === '' || direccion.trim() === '' || telefono.trim() === '' ||
        ciudad.trim() === '' || gerente.trim() === '') {
        return 'Los campos no pueden estar vacíos o contener solo espacios';
    }

    // Validar nombre duplicado
    const query = { nombre: new RegExp(`^${nombre}$`, 'i') }; // Case-insensitive check
    if (concesionariaId) {
        query._id = { $ne: concesionariaId };
    }
    const existing = await Concesionaria.findOne(query);
    if (existing) {
        return 'Ya existe una concesionaria con ese nombre';
    }

    return null;
}

async function addNewConcesionaria(req, res) {
    try {
        const { nombre, direccion, telefono, ciudad, gerente } = req.body;

        const error = await validateConcesionariaData(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const newConcesionaria = new Concesionaria({
            nombre,
            direccion,
            telefono,
            ciudad,
            gerente
        });

        await newConcesionaria.save();
        res.status(201).json(newConcesionaria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateConcesionaria(req, res) {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono, ciudad, gerente } = req.body;

        const concesionaria = await Concesionaria.findById(id);
        if (!concesionaria) return res.status(404).json({ message: 'Concesionaria no encontrada' });

        if (nombre !== undefined) {
            const error = await validateConcesionariaData({
                nombre,
                direccion: direccion || concesionaria.direccion,
                telefono: telefono || concesionaria.telefono,
                ciudad: ciudad || concesionaria.ciudad,
                gerente: gerente || concesionaria.gerente
            }, id);

            if (error) {
                return res.status(400).json({ message: error });
            }
        }

        if (nombre !== undefined) concesionaria.nombre = nombre;
        if (direccion !== undefined) concesionaria.direccion = direccion;
        if (telefono !== undefined) concesionaria.telefono = telefono;
        if (ciudad !== undefined) concesionaria.ciudad = ciudad;
        if (gerente !== undefined) concesionaria.gerente = gerente;

        await concesionaria.save();
        res.json(concesionaria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteConcesionaria(req, res) {
    try {
        const { id } = req.params;
        const deletedConcesionaria = await Concesionaria.findByIdAndDelete(id);
        if (!deletedConcesionaria) return res.status(404).json({ message: 'Concesionaria no encontrada' });
        res.json(deletedConcesionaria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function _clearConcesionarias() {
    await Concesionaria.deleteMany({});
}

module.exports = {
    getAllConcesionarias,
    addNewConcesionaria,
    updateConcesionaria,
    deleteConcesionaria,
    _clearConcesionarias
};
