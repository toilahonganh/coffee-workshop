const mongoose = require('mongoose');

const DrinkTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const DrinkTypeModel = mongoose.model("DrinkType", DrinkTypeSchema);

module.exports = DrinkTypeModel;
