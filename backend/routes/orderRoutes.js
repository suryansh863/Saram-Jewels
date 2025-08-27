const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/create', orderController.createOrder);

// Process payment
router.post('/process-payment', orderController.processPayment);

// Get payment methods
router.get('/payment-methods', orderController.getPaymentMethods);

// Get user's orders
router.get('/:userId', orderController.getUserOrders);

// Get single order
router.get('/order/:id', orderController.getOrderById);

// Update order status (admin only)
router.put('/:id/status', orderController.updateOrderStatus);

// Razorpay webhook
router.post('/webhook', orderController.razorpayWebhook);

module.exports = router;
