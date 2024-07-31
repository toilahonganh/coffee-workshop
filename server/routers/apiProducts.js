const express = require('express');
const routers = express.Router();
const DrinkModel = require('../models/DrinkModel');

const { postDrinkController, getDrinkController } = require('../controllers/DrinkController');

routers.get('/', (req, res) => {
    res.send("Hello, world")
})

routers.get('/drinks', getDrinkController);
routers.post('/drinks', postDrinkController);



module.exports = routers;