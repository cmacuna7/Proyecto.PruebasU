const Cliente = require('../models/cliente.model');

async function getAllClientes(req, res) {
    try {
        const clientes = await Cliente.find();
        res.json({ message: 'Clientes obtenidos exitosamente', clientes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getClienteById(req, res) {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findById(id);
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json({ message: 'Cliente obtenido exitosamente', cliente });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

function hasEmptyFields(fields) {
    return fields.some(f => !f || f.trim() === '');
}

async function isEmailDuplicate(email, excludeId = null) {
    const query = { email: email.toLowerCase() };
    if (excludeId) {
        query._id = { $ne: excludeId };
    }
    const existing = await Cliente.findOne(query);
    return !!existing;
}

async function validateClienteData(data, clienteId = null) {
    const { nombre, email, telefono, direccion, ciudad } = data;
    if (hasEmptyFields([nombre, email, telefono, direccion, ciudad])) {
        return 'Nombre, Email, Teléfono, Dirección y Ciudad son requeridos';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'El email no tiene un formato válido';

    if (await isEmailDuplicate(email, clienteId)) return 'El email ya está registrado';
    return null;
}

async function addNewCliente(req, res) {
    try {
        const { nombre, email, telefono, direccion, ciudad } = req.body;

        const error = await validateClienteData(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const newCliente = new Cliente({
            nombre,
            email,
            telefono,
            direccion,
            ciudad
        });

        await newCliente.save();
        res.status(201).json({ message: 'Cliente agregado exitosamente', cliente: newCliente });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateCliente(req, res) {
    try {
        const { id } = req.params;
        const { nombre, email, telefono, direccion, ciudad } = req.body;

        const cliente = await Cliente.findById(id);
        if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

        // Validar si se está actualizando el email
        if (email !== undefined) {
            const error = await validateClienteData({
                nombre: nombre || cliente.nombre,
                email,
                telefono: telefono || cliente.telefono,
                direccion: direccion || cliente.direccion,
                ciudad: ciudad || cliente.ciudad
            }, id);

            if (error) {
                return res.status(400).json({ message: error });
            }
        }

        if (nombre !== undefined) cliente.nombre = nombre;
        if (email !== undefined) cliente.email = email;
        if (telefono !== undefined) cliente.telefono = telefono;
        if (direccion !== undefined) cliente.direccion = direccion;
        if (ciudad !== undefined) cliente.ciudad = ciudad;

        await cliente.save();
        res.json({ message: 'Cliente actualizado exitosamente', cliente });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteCliente(req, res) {
    try {
        const { id } = req.params;
        const deletedCliente = await Cliente.findByIdAndDelete(id);
        if (!deletedCliente) return res.status(404).json({ message: 'Cliente no encontrado' });
        res.json({ message: 'Cliente eliminado exitosamente', cliente: deletedCliente });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function _clearClientes() {
    await Cliente.deleteMany({});
}

module.exports = { getAllClientes, addNewCliente, updateCliente, deleteCliente, getClienteById, _clearClientes };
