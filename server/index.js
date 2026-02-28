const express = require('express');
const router = express.Router();

const productRoutes = require('./api/products');
const adminRoutes = require('./api/admin');

router.use('/products', productRoutes);
router.use('/admin', adminRoutes);

module.exports = router;