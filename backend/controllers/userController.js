const { User } = require('../models');
const { Clerk } = require('@clerk/clerk-sdk-node');

// Get user by clerk_user_id
exports.getUserByClerkId = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    
    const user = await User.findOne({ where: { clerk_user_id: clerkUserId } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Create or update user from Clerk webhook
exports.createOrUpdateUser = async (req, res) => {
  try {
    const { data } = req.body;
    
    // Clerk webhook payload
    const { id, email_addresses, phone_numbers } = data;
    
    // Get primary email
    const primaryEmail = email_addresses.find(email => email.id === data.primary_email_address_id);
    const emailValue = primaryEmail ? primaryEmail.email_address : null;
    
    // Get primary phone
    const primaryPhone = phone_numbers.find(phone => phone.id === data.primary_phone_number_id);
    const phoneValue = primaryPhone ? primaryPhone.phone_number : null;
    
    if (!emailValue) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if user exists
    let user = await User.findOne({ where: { clerk_user_id: id } });
    
    if (user) {
      // Update existing user
      user = await user.update({
        email: emailValue,
        phone: phoneValue,
        updated_at: new Date()
      });
    } else {
      // Create new user
      user = await User.create({
        clerk_user_id: id,
        email: emailValue,
        phone: phoneValue
      });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Error processing user data', error: error.message });
  }
};

// Delete user when deleted from Clerk
exports.deleteUser = async (req, res) => {
  try {
    const { data } = req.body;
    const { id } = data;
    
    const user = await User.findOne({ where: { clerk_user_id: id } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.destroy();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
