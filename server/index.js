const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/index');
const ErrorMiddleware = require('./middlewares/error-middleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);
app.use(ErrorMiddleware);
const PORT = process.env.PORT || 7000;

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Сервер был запущен на ${PORT} порту`));
    } catch (error) {
        console.log(error)
    }
}

start();