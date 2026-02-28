const express = require('express');
const router = express.Router();
const { addProduct } = require('../../controllers/productController');
const authMiddleware = require('../../middleware/auth'); // опціонально

// Якщо хочете захистити додавання – розкоментуйте middleware
// router.post('/add', authMiddleware, addProduct);
router.post('/add', addProduct); // без захисту для простоти

module.exports = router;