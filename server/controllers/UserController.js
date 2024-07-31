const { postRegisterService, postLoginService } = require('../services/UserService');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'askasasasas';


module.exports = {
    postRegisterController: async (req, res) => {
        try {
            let { gmail, username, password, phone, address } = req.body;
            let userInfo = { gmail, username, password, phone, address };

            let userRegister = await postRegisterService(userInfo);

            return res.status(200).json({
                EC: 1,
                data: userRegister
            })

        } catch (error) {
            return res.status(500).json({ error });
        }
    },
    postLoginController: async (req, res) => {
        try {
            const { gmail, password } = req.body;
            if (!gmail || !password) {
                return res.status(400).json('Username and password are required');
            }

            const userDoc = await UserModel.findOne({ gmail });
            if (!userDoc) {
                return res.status(400).json('User not found');
            }

            const passOk = await bcrypt.compare(password, userDoc.password);
            if (passOk) {
                jwt.sign({ gmail, id: userDoc._id }, secret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({
                        id: userDoc._id,
                        gmail,
                    });
                });
                console.log(userDoc);
            } else {
                res.status(400).json('Wrong credentials');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    }
}