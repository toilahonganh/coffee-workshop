require('dotenv').config();
const mongoose = require('mongoose');
const DrinkTypeModel = require('../models/TypeModels');

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_HOSTNAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const defaultTypes = ['Coffee', 'Tea', 'Juice'];

        // Kiểm tra các loại đã tồn tại
        const existingTypes = await DrinkTypeModel.find({ name: { $in: defaultTypes } });

        // Lấy tên các loại đã tồn tại
        const existingTypeNames = existingTypes.map(type => type.name);

        // Lọc các loại cần thêm mới
        const typesToAdd = defaultTypes.filter(type => !existingTypeNames.includes(type));

        if (typesToAdd.length > 0) {
            await DrinkTypeModel.insertMany(typesToAdd.map(name => ({ name })));
            console.log('Default drink types added');
        } else {
            console.log('All default drink types already exist');
        }
    } catch (error) {
        console.error('Connect failure:', error);
    }
};

module.exports = connection;
