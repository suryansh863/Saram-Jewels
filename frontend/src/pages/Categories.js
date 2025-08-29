import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  StarIcon,
  FireIcon
} from '@heroicons/react/24/outline';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'rings',
      name: 'Rings',
      description: 'Beautiful American Diamond rings that are anti-tarnish and affordable',
      price: '₹250 - ₹1000',
      image: '/images/rings-category.jpg',
      count: 24,
      featured: false
    },
    {
      id: 'necklace',
      name: 'Necklace',
      description: 'Elegant American Diamond necklaces for all occasions',
      price: '₹1000 - ₹4000',
      image: '/images/necklace-category.jpg',
      count: 18,
      featured: false
    },
    {
      id: 'earrings',
      name: 'Earrings',
      description: 'Stunning American Diamond earrings that sparkle like real diamonds',
      price: '₹300 - ₹1500',
      image: '/images/earrings-category.jpg',
      count: 32,
      featured: false
    },
    {
      id: 'chains',
      name: 'Chains',
      description: 'Anti-tarnish American Diamond chains for everyday wear',
      price: '₹500 - ₹2000',
      image: '/images/chains-category.jpg',
      count: 15,
      featured: false
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      description: 'Elegant American Diamond bracelets that add a touch of luxury',
      price: '₹400 - ₹1200',
      image: '/images/bracelets-category.jpg',
      count: 12,
      featured: false
    },
    {
      id: 'necklace-set',
      name: 'Necklace Set',
      description: 'Complete American Diamond necklace sets for special occasions',
      price: '₹1500 - ₹5000',
      image: '/images/necklace-set-category.jpg',
      count: 8,
      featured: false
    },
    {
      id: 'gift-box-set',
      name: 'Gift Box Set',
      description: 'Special Gift Box Sets including Necklace + Earring combo at ₹1000',
      price: '₹1000',
      image: '/images/gift-box-category.jpg',
      count: 6,
      featured: true
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-green-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-15"></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-900/90 to-green-900/95"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-jewelry font-bold text-amber-50 mb-8">
              Our Collections
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Explore our complete collection of American Diamond jewelry
            </p>
            <div className="flex items-center justify-center space-x-4">
              <SparklesIcon className="h-8 w-8 text-amber-200" />
              <span className="text-lg text-amber-100">Anti-tarnish • Affordable • Elegant</span>
              <SparklesIcon className="h-8 w-8 text-amber-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-green-900 border-b border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-amber-200 text-green-900 shadow-lg'
                  : 'bg-green-800 text-amber-100 hover:bg-green-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-200 text-green-900 shadow-lg'
                    : 'bg-green-800 text-amber-100 hover:bg-green-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className={`group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  category.featured ? 'ring-2 ring-amber-300 ring-offset-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-amber-300 to-amber-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <FireIcon className="h-4 w-4 mr-1" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Category Image */}
                <div className="aspect-square bg-gradient-to-br from-green-800 to-green-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Placeholder for category image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <SparklesIcon className="h-8 w-8 text-green-900" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6 bg-green-800">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-amber-50 group-hover:text-amber-200 transition-colors">
                      {category.name}
                    </h3>
                    {category.featured && (
                      <StarIcon className="h-5 w-5 text-amber-300 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  
                  <p className="text-amber-100 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-200 font-bold text-lg">
                        {category.price}
                      </p>
                      <p className="text-amber-100 text-sm">
                        {category.count} items
                      </p>
                    </div>
                    
                    <div className="flex items-center text-amber-300 group-hover:text-amber-400 transition-colors">
                      <span className="text-sm font-medium mr-1">Explore</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>

          {/* Special Offer Section */}
                        <div className="mt-16 bg-gradient-to-r from-amber-300 to-amber-400 rounded-2xl p-8 text-green-900">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-jewelry font-bold mb-4">
                Special Gift Box Sets
              </h2>
              <p className="text-xl mb-6 max-w-2xl mx-auto">
                Perfect combination of Necklace + Earring combo at just ₹1000
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products?category=gift-box-set"
                  className="bg-white text-green-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  Shop Gift Sets
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-green-900 transition-colors inline-flex items-center"
                >
                  Contact Us
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-jewelry font-bold text-gray-800 mb-4">
              Why Choose Our Jewelry?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of elegance, quality, and affordability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-green-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Anti-Tarnish
              </h3>
              <p className="text-gray-600">
                Long-lasting shine that never fades, perfect for everyday wear
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-green-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Handcrafted with attention to detail and premium materials
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FireIcon className="h-8 w-8 text-green-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Affordable Luxury
              </h3>
              <p className="text-gray-600">
                Beautiful jewelry at prices that won't break the bank
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
