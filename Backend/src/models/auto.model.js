const mongoose = require('mongoose');

const autoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true,
        trim: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true
    },
    anio: {
        type: Number,
        required: true,
        min: 1900
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    numeroSerie: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    }
}, {
    timestamps: true
});

// Configure toJSON to include id and remove _id and __v
autoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Auto', autoSchema);
