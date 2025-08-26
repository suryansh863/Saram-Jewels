const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', cartController.addToCart);

// Get user's cart
router.get('/:userId', cartController.getUserCart);

// Update cart item quantity
router.put('/update', cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Clear user's cart
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
