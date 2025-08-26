const { Order, OrderItem, Cart, Product, User } = require('../models');
const Razorpay = require('razorpay');
const sequelize = require('../config/database');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create new order
exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { user_id, shipping_address } = req.body;
    
    // Get user's cart items
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product, as: 'product' }],
      transaction
    });
    
    if (cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate total amount
    let total_amount = 0;
    cartItems.forEach(item => {
      total_amount += parseFloat(item.product.price) * item.quantity;
    });
    
    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total_amount * 100), // Convert to paisa
      currency: 'INR',
      receipt: `order_${Date.now()}`
    });
    
    // Create order in database
    const order = await Order.create({
      user_id,
      total_amount,
      status: 'pending',
      razorpay_order_id: razorpayOrder.id,
      shipping_address
    }, { transaction });
    
    // Create order items
    const orderItems = await Promise.all(cartItems.map(async (item) => {
      return OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price
      }, { transaction });
    }));
    
    // Clear user's cart
    await Cart.destroy({
      where: { user_id },
      transaction
    });
    
    await transaction.commit();
    
    res.status(201).json({
      order,
      orderItems,
      razorpayOrder
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        },
        { model: User, as: 'user' }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.update({ status });
    
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Razorpay webhook handler
exports.razorpayWebhook = async (req, res) => {
  try {
    const { payload } = req.body;
    const { payment } = payload;
    
    // Verify webhook signature (implement in production)
    // const signature = req.headers['x-razorpay-signature'];
    // const isValid = razorpay.webhooks.verify(JSON.stringify(req.body), signature, webhook_secret);
    
    if (payment && payment.entity && payment.entity.order_id) {
      const order = await Order.findOne({
        where: { razorpay_order_id: payment.entity.order_id }
      });
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Update order status based on payment status
      if (payment.entity.status === 'captured') {
        await order.update({
          status: 'processing',
          payment_id: payment.entity.id
        });
      } else if (payment.entity.status === 'failed') {
        await order.update({ status: 'cancelled' });
      }
      
      res.status(200).json({ message: 'Webhook processed successfully' });
    } else {
      res.status(400).json({ message: 'Invalid webhook payload' });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ message: 'Error processing webhook', error: error.message });
  }
};
