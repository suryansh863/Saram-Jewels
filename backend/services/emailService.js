const nodemailer = require('nodemailer');

// Create transporter for Gmail
let transporter = null;

// Only create transporter if email credentials are configured
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} else {
  console.log('Email credentials not configured. Contact form submissions will be logged only.');
}

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const { name, email, phone, subject, message } = contactData;
    
    // Log the contact form submission
    console.log('📧 Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone || 'Not provided');
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Time:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    console.log('---');
    
    // If email transporter is not configured, just log and return success
    if (!transporter) {
      console.log('⚠️ Email not sent - credentials not configured. Please set up EMAIL_USER and EMAIL_PASSWORD in .env file');
      return { success: true, messageId: 'logged-only' };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'saramjewels@gmail.com',
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Message</h3>
            <p style="color: #78350f; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from the Saram Jewels contact form.</p>
            <p>Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (orderData, userEmail) => {
  try {
    const { order_id, total_amount, items } = orderData;
    
    // Log the order confirmation
    console.log('📧 Order Confirmation Email:');
    console.log('Order ID:', order_id);
    console.log('Total Amount:', total_amount);
    console.log('User Email:', userEmail);
    console.log('Time:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    console.log('---');
    
    // If email transporter is not configured, just log and return success
    if (!transporter) {
      console.log('⚠️ Order confirmation email not sent - credentials not configured');
      return { success: true, messageId: 'logged-only' };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Order Confirmation - Order #${order_id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            Order Confirmation
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">Thank you for your order!</h3>
            <p><strong>Order ID:</strong> #${order_id}</p>
            <p><strong>Total Amount:</strong> ₹${total_amount}</p>
            <p><strong>Status:</strong> <span style="color: #059669;">Confirmed</span></p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>We'll process your order and ship it to you soon.</p>
            <p>If you have any questions, please contact us at saramjewels@gmail.com</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactEmail,
  sendOrderConfirmationEmail
};
