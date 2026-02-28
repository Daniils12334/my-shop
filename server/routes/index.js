require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Підключення до БД
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Маршрути
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порту ${PORT}`);
});