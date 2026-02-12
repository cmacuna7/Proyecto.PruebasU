const mongoose = require('mongoose');

const obreroSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        trim: true
    },
    horasTrabajadas: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

// Configure toJSON to include id and remove _id and __v
obreroSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Obrero', obreroSchema);
