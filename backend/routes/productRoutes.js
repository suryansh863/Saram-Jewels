const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products with pagination
router.get('/', productController.getProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Search products
router.get('/search', productController.searchProducts);

// Create new product (admin only)
router.post('/', productController.createProduct);

// Update product (admin only)
router.put('/:id', productController.updateProduct);

// Delete product (admin only)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
