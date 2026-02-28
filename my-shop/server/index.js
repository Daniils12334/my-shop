const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Дозволяє фронтенду спілкуватися з бекендом
app.use(express.json());

// Це твоя база даних (поки що просто список)
const storeData = {
    products: [
        { id: 1, name: "Цифровий арт", price: 250, link: "https://your-download-link.com/item1" },
        { id: 2, name: "Курс розробки", price: 800, link: "https://your-download-link.com/item2" }
    ],
    news: "Сьогодні відкриття! Першим 10 покупцям — бонус."
};

// Маршрут, щоб отримати інформацію на сайт
app.get('/api/data', (req, res) => {
    res.json(storeData);
});

app.listen(5000, () => console.log("Сервер запущено на http://localhost:5000"));