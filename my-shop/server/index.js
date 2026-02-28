const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // загружаем переменные окружения

const app = express();

app.use(cors());
app.use(express.json());

// 1. ПІДКЛЮЧЕННЯ ДО БАЗИ
const MONGODB_URI = process.env.MONGODB_URI;

// Якщо змінна оточення не задана, можна використати запасний варіант (але краще налаштувати .env)
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI не задана в .env');
  process.exit(1);
}

// Додаткові опції для стабільності підключення
const mongooseOptions = {
  family: 4,                // використовувати IPv4
  serverSelectionTimeoutMS: 10000, // таймаут вибору сервера (10 сек)
  socketTimeoutMS: 45000,    // таймаут сокета
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log("✅ База даних підключена успішно!");
    // Запускаємо сервер ТІЛЬКИ після успішного підключення до БД
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Сервер працює на порту ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Помилка підключення до MongoDB:", err.message);
    process.exit(1); // завершуємо процес, якщо БД недоступна
  });

// 2. СХЕМА ТОВАРУ
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },  // додамо валідацію
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// 3. ОТРИМАННЯ ТОВАРІВ
app.get('/api/data', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            products: products,
            news: "Сьогодні відкриття! Дані завантажено з MongoDB."
        });
    } catch (err) {
        res.status(500).json({ error: "Не вдалося отримати дані" });
    }
});

// 4. ДОДАВАННЯ ТОВАРУ
app.post('/api/admin/add', async (req, res) => {
    try {
        const { name, price } = req.body;

        // Проста валідація
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: "Назва товару обов'язкова" });
        }
        if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            return res.status(400).json({ error: "Ціна має бути додатним числом" });
        }

        const newProduct = new Product({ name: name.trim(), price: Number(price) });
        await newProduct.save();
        console.log("✅ Товар збережено в базу:", name);
        res.json({ message: "Успішно додано в MongoDB" });
    } catch (err) {
        console.error("Помилка при збереженні:", err);
        res.status(500).json({ error: "Помилка при збереженні" });
    }
});

// (Не забудьте, що app.listen тепер всередині then)