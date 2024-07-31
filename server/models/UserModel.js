const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    gmail: { type: String, required: true, unique: true },
    username: { type: String, required: true, min: 4 },
    password: { type: String, required: true },
    phone: String,
    address: String
})

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;