const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Keep case insensitive check in mind
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'El email no tiene un formato válido'
        ]
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[0-9]{7,15}$/,
            'El teléfono debe contener solo números y tener entre 7 y 15 dígitos'
        ]
    },
    comision: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    codigoEmpleado: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

// Configure toJSON to include id and remove _id and __v
vendorSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Vendor', vendorSchema);
