const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    monto: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        enum: ['A', 'B', 'C'],
        required: true
    }
}, {
    timestamps: true
});

// Configure toJSON to include id and remove _id and __v
ventaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Venta', ventaSchema);
