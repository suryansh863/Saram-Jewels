import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+91 8799726787'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['info@saramjewelry.com', 'support@saramjewelry.com'],
      description: 'Send us an email anytime'
    },
    {
      icon: MapPinIcon,
      title: 'Address',
      details: ['H-37, L-block, Laxmi Nagar', 'East Delhi, Delhi 110092'],
      description: 'Visit our location'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: ['Monday - Saturday: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      description: 'We\'re here to serve you'
    }
  ];

  return (
    <div className="min-h-screen bg-green-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-15"></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-900/90 to-green-900/95"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-jewelry font-bold text-amber-50 mb-8">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Have questions about our jewelry? We'd love to hear from you.
            </p>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto">
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-green-800 rounded-2xl shadow-xl p-8 border border-green-700">
            <h2 className="text-3xl font-jewelry font-bold text-amber-50 mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-amber-100 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-green-600 rounded-lg bg-green-700 text-amber-50 placeholder-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-100 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-green-600 rounded-lg bg-green-700 text-amber-50 placeholder-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-amber-100 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-green-600 rounded-lg bg-green-700 text-amber-50 placeholder-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-amber-100 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-green-600 rounded-lg bg-green-700 text-amber-50 focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="order">Order Status</option>
                    <option value="return">Return & Exchange</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-100 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-green-600 rounded-lg bg-green-700 text-amber-50 placeholder-amber-200 focus:ring-2 focus:ring-amber-300 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-200 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-jewelry font-bold text-amber-50 mb-6">
                Contact Information
              </h2>
              <p className="text-amber-100 mb-8">
                We're here to help and answer any questions you might have. 
                We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-green-800 rounded-xl shadow-xl border border-green-700">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-200 to-amber-300 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-green-900" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-50 mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-amber-100">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-amber-200 mt-2">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media & WhatsApp */}
                          <div className="bg-gradient-to-r from-amber-300 to-amber-400 rounded-2xl p-8 text-green-900">
              <h3 className="text-2xl font-jewelry font-bold mb-4">
                Connect With Us
              </h3>
              <p className="mb-6">
                Follow us on social media for the latest updates, new arrivals, and exclusive offers.
              </p>
              
              <div className="space-y-4">
                <button className="w-full bg-white text-pink-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                  WhatsApp Us
                </button>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-white bg-opacity-20 text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-30 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 bg-white bg-opacity-20 text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-30 transition-colors">
                    Instagram
                  </button>
                  <button className="flex-1 bg-white bg-opacity-20 text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-30 transition-colors">
                    YouTube
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-jewelry font-bold text-gray-800 mb-6 text-center">
              Find Our Showroom
            </h2>
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Google Maps integration will be displayed here
                </p>
                <p className="text-gray-500 mt-2">
                  123 Jewelry Street, Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-jewelry font-bold text-gray-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    What is American Diamond (A.D)?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    American Diamond, also known as Cubic Zirconia, is a brilliant alternative to natural diamonds that offers the same stunning sparkle at a fraction of the cost.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Is your jewelry anti-tarnish?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Yes, all our jewelry is treated with anti-tarnish properties to maintain their beautiful shine for years to come.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    What is your return policy?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    We offer a 30-day return policy for all unused items in their original packaging. Contact us for return instructions.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Do you offer international shipping?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Currently, we ship within India only. We're working on expanding our shipping options to other countries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
