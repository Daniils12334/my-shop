const Product = require('../models/Product');

// Отримати всі товари + новина (статична)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // Тут можна підтягувати новину з БД, а покі що статика
    const news = "🔥 Сьогодні знижка на всі товари 10%!";
    res.json({ products, news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Додати новий товар (тільки для адміна)
exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: 'Будь ласка, заповніть всі поля' });
    }

    const newProduct = new Product({ name, price });
    await newProduct.save();
    
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};