import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const categories = [
    {
      name: 'Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      price: '₹250 - ₹1000',
      href: '/products?category=rings'
    },
    {
      name: 'Necklaces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      price: '₹1000 - ₹4000',
      href: '/products?category=necklaces'
    },
    {
      name: 'Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      price: '₹300 - ₹1500',
      href: '/products?category=earrings'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Jewelry Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with jewelry overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
          {/* Additional jewelry pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        </div>
        
        {/* Floating jewelry elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full opacity-35 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full opacity-30 animate-bounce"></div>
          {/* Additional floating elements */}
          <div className="absolute top-60 left-1/4 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute bottom-60 right-1/4 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-30 animate-bounce"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800 mb-6 shadow-lg">
              <SparklesIcon className="h-5 w-5 text-pink-500 mr-2" />
              Premium American Diamond Jewelry
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-jewelry font-bold text-gray-900 mb-6 leading-tight drop-shadow-lg">
            Elegant Jewelry for
            <span className="block bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
              Every Occasion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover our stunning collection of anti-tarnish jewelry at affordable prices. 
            Handcrafted with precision and care for the modern woman.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              to="/products"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center group shadow-lg hover:shadow-xl"
            >
              Shop Now
              <ArrowRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/categories"
              className="btn-secondary text-lg px-10 py-4 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Explore Categories
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <ShieldCheckIcon className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold">100% Authentic</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <TruckIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold">Free Delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <SparklesIcon className="h-5 w-5 text-pink-600" />
              <span className="text-sm font-semibold">Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-jewelry font-bold text-gray-800 mb-6">
              Why Choose Saram?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring you the finest American Diamond jewelry with unmatched quality and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center p-8 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl border border-pink-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <SparklesIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-jewelry font-bold text-gray-800 mb-4">
                    Anti-Tarnish
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our jewelry is specially treated to resist tarnishing, ensuring your pieces stay beautiful for years to come
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center p-8 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl border border-purple-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <ShieldCheckIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-jewelry font-bold text-gray-800 mb-4">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Handcrafted with precision and care using the finest materials and techniques
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center p-8 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl border border-pink-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <TruckIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-jewelry font-bold text-gray-800 mb-4">
                    Fast Delivery
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Quick and secure delivery across India with real-time tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-jewelry font-bold text-gray-800 mb-6">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of stunning jewelry pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-jewelry font-bold mb-2">{category.name}</h3>
                  <p className="text-pink-200 font-medium">{category.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="btn-primary inline-flex items-center text-lg px-10 py-4 shadow-lg hover:shadow-xl"
            >
              View All Categories
              <ArrowRightIcon className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-jewelry font-bold text-gray-800 mb-6">
                About Saram Jewelry
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are passionate about bringing you the finest American Diamond jewelry that combines 
                elegance, affordability, and durability. Our pieces are designed for the modern woman 
                who appreciates both style and quality.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every piece in our collection is carefully crafted using anti-tarnish technology, 
                ensuring your jewelry stays beautiful and radiant for years to come. From everyday 
                elegance to special occasions, we have the perfect piece for every moment.
              </p>
              <Link
                to="/products"
                className="btn-primary inline-flex items-center shadow-lg hover:shadow-xl"
              >
                Explore Collection
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center p-8 shadow-xl border border-pink-200">
                <div className="text-center">
                  <SparklesIcon className="h-32 w-32 text-pink-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-jewelry font-bold text-gray-800 mb-4">
                    Crafted with Love
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Every piece tells a story of elegance and sophistication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-jewelry font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <PhoneIcon className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+91 8799726787</p>
              <p className="text-sm text-gray-500">Mon-Sat 9AM-8PM</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <EnvelopeIcon className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">info@saramjewelry.com</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <MapPinIcon className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">H-37, L-block, Laxmi Nagar</p>
              <p className="text-sm text-gray-500">East Delhi, Delhi 110092</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Contact Us
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
