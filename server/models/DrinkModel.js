const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    image: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DrinkType',
        required: true
    }
}, {
    timestamps: true,
});

const DrinkModel = mongoose.model("Drinks", DrinkSchema);

module.exports = DrinkModel;
