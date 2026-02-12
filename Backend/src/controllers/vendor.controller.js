const Vendor = require('../models/vendor.model');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{7,15}$/;

async function createVendor(req, res) {
    try {
        const { name, email, telefono, comision, codigoEmpleado } = req.body;

        if (!name || !email || !telefono || comision === undefined || !codigoEmpleado)
            return res.status(400).json({ message: 'Nombre, Email, Teléfono, Comisión y Código Empleado son requeridos' });

        if (!emailRegex.test(email))
            return res.status(400).json({ message: 'El email no es válido' });

        if (!phoneRegex.test(telefono))
            return res.status(400).json({ message: 'El teléfono debe contener solo números y tener entre 7 y 15 dígitos' });

        if (isNaN(comision) || comision < 0 || comision > 100)
            return res.status(400).json({ message: 'La comisión debe ser un número entre 0 y 100' });

        const emailExists = await Vendor.findOne({ email });
        if (emailExists) return res.status(409).json({ message: 'El email ya está registrado' });

        const codeExists = await Vendor.findOne({ codigoEmpleado });
        if (codeExists) return res.status(409).json({ message: 'El código de empleado ya está registrado' });

        const newVendor = new Vendor({ name, email, telefono, comision, codigoEmpleado });
        await newVendor.save();
        return res.status(201).json(newVendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllVendors(req, res) {
    try {
        const vendedores = await Vendor.find();
        res.json(vendedores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getVendorById(req, res) {
    try {
        const { id } = req.params;
        const vendedor = await Vendor.findById(id);

        if (!vendedor)
            return res.status(404).json({ message: 'Vendedor no encontrado' });

        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateVendor(req, res) {
    try {
        const { id } = req.params;
        const { name, email, telefono, comision, codigoEmpleado } = req.body;

        const vendedor = await Vendor.findById(id);
        if (!vendedor) return res.status(404).json({ message: 'Vendedor no encontrado' });

        if (email !== undefined && !emailRegex.test(email))
            return res.status(400).json({ message: 'El email no es válido' });

        if (telefono !== undefined && !phoneRegex.test(telefono))
            return res.status(400).json({ message: 'El teléfono debe contener solo números y tener entre 7 y 15 dígitos' });

        if (comision !== undefined && (isNaN(comision) || comision < 0 || comision > 100))
            return res.status(400).json({ message: 'La comisión debe ser un número entre 0 y 100' });

        if (email !== undefined && email !== vendedor.email) {
            const emailExists = await Vendor.findOne({ email });
            if (emailExists) return res.status(409).json({ message: 'El email ya está registrado por otro vendedor' });
        }

        if (codigoEmpleado !== undefined && codigoEmpleado !== vendedor.codigoEmpleado) {
            const codeExists = await Vendor.findOne({ codigoEmpleado });
            if (codeExists) return res.status(409).json({ message: 'El código de empleado ya está registrado' });
        }

        if (name !== undefined) vendedor.name = name;
        if (email !== undefined) vendedor.email = email;
        if (telefono !== undefined) vendedor.telefono = telefono;
        if (comision !== undefined) vendedor.comision = comision;
        if (codigoEmpleado !== undefined) vendedor.codigoEmpleado = codigoEmpleado;

        await vendedor.save();
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteVendor(req, res) {
    try {
        const { id } = req.params;
        const deletedVendor = await Vendor.findByIdAndDelete(id);

        if (!deletedVendor)
            return res.status(404).json({ message: 'Vendedor no encontrado' });

        res.status(200).json({ message: 'Vendedor eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function _clearVendedores() {
    await Vendor.deleteMany({});
}

module.exports = { createVendor, getAllVendors, getVendorById, updateVendor, deleteVendor, _clearVendedores };
