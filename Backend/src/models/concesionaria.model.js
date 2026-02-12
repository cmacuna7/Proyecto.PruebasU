const mongoose = require('mongoose');

const concesionariaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    gerente: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Configure toJSON to include id and remove _id and __v
concesionariaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Concesionaria', concesionariaSchema);
