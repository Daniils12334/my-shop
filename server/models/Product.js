const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Назва товару обов’язкова'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Ціна обов’язкова'],
    min: [0, 'Ціна не може бути від’ємною'],
  },
}, {
  timestamps: true, // додає createdAt та updatedAt
});

module.exports = mongoose.model('Product', productSchema);