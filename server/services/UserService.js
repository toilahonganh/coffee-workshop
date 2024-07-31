const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    postLoginService: async (gmail, password) => {
        try {
            let userDoc = await UserModel.findOne({ gmail });
            let passOk = bcrypt.compareSync(password, userDoc.password);
            return userDoc + passOk;
        } catch (error) {
            return error;
        }
    },
    postRegisterService: async (userInfo) => {
        try {
            const existingUser = await UserModel.findOne({ gmail: userInfo.gmail });
            if (existingUser) {
                return "G-mail already exists";
            } else {
                let pwd = userInfo.password;
                let userDoc = await UserModel.create({
                    gmail: userInfo.gmail,
                    username: userInfo.username,
                    password: bcrypt.hashSync(pwd, salt),
                    phone: userInfo.phone,
                    address: userInfo.address
                })
                return userDoc;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    },
}