const { Cart, Product, User } = require('../models');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    
    // Validate input
    if (!user_id || !product_id) {
      return res.status(400).json({ message: 'User ID and Product ID are required' });
    }
    
    // Check if product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if item already in cart
    let cartItem = await Cart.findOne({
      where: { user_id, product_id }
    });
    
    if (cartItem) {
      // Update quantity if already in cart
      cartItem = await cartItem.update({
        quantity: quantity || cartItem.quantity + 1
      });
    } else {
      // Create new cart item
      cartItem = await Cart.create({
        user_id,
        product_id,
        quantity: quantity || 1
      });
    }
    
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

// Get user's cart items
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        { model: Product, as: 'product' }
      ]
    });
    
    // Calculate total
    let total = 0;
    cartItems.forEach(item => {
      total += parseFloat(item.product.price) * item.quantity;
    });
    
    res.json({
      items: cartItems,
      total: total.toFixed(2),
      count: cartItems.length
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    
    const cartItem = await Cart.findByPk(id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await cartItem.destroy();
      return res.json({ message: 'Item removed from cart' });
    }
    
    await cartItem.update({ quantity });
    
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const cartItem = await Cart.findByPk(itemId);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    await cartItem.destroy();
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};

// Clear user's cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    await Cart.destroy({
      where: { user_id: userId }
    });
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
};
