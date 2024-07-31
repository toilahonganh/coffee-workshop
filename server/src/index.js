require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connection = require('../configs/connection');
const routerProduct = require('../routers/apiProducts');
const routerUser = require('../routers/apiUser');
const PORT = process.env.PORT || 8888;
const HOSTNAME = process.env.HOST_NAME || 'localhost';
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/products', routerProduct);
app.use('/users', routerUser);


(async () => {
    try {
        await connection();

        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Getting errors: ", error);
    }
})();
