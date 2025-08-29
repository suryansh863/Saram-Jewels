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
    <div className="min-h-screen bg-green-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-green-900">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-900/80 to-green-900/95"></div>
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-amber-200/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-amber-200/15 rounded-full"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 border border-amber-200/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 border border-amber-200/20 rounded-full"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-jewelry font-bold text-amber-50 mb-8 leading-tight">
            We Empower
            <span className="block text-amber-200">
              Business
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-amber-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            We're dedicated to helping our clients achieve their goals through exceptional jewelry craftsmanship and timeless design.
          </p>
          
          <div className="flex justify-center">
            <button className="bg-amber-200 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <SparklesIcon className="h-12 w-12 text-green-900" />
              </div>
              <h3 className="text-2xl font-jewelry font-bold text-amber-50 mb-4">
                Proven Track Record
              </h3>
              <p className="text-amber-100 leading-relaxed text-lg">
                Decades of experience in creating exceptional jewelry pieces that stand the test of time and exceed expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheckIcon className="h-12 w-12 text-green-900" />
              </div>
              <h3 className="text-2xl font-jewelry font-bold text-amber-50 mb-4">
                Forward-Thinking Approach
              </h3>
              <p className="text-amber-100 leading-relaxed text-lg">
                We combine traditional craftsmanship with innovative techniques to create jewelry that's both timeless and contemporary.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <TruckIcon className="h-12 w-12 text-green-900" />
              </div>
              <h3 className="text-2xl font-jewelry font-bold text-amber-50 mb-4">
                Trusted Partnership
              </h3>
              <p className="text-amber-100 leading-relaxed text-lg">
                Building lasting relationships with our clients through transparency, quality, and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 md:py-32 bg-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-jewelry font-bold text-amber-50 mb-6">
              Our Collections
            </h2>
            <p className="text-xl sm:text-2xl text-amber-100 max-w-3xl mx-auto px-4">
              Discover our curated selection of timeless jewelry pieces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className="group relative overflow-hidden rounded-xl bg-green-800 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-green-700"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-jewelry font-bold text-amber-50 mb-3">{category.name}</h3>
                  <p className="text-amber-100 text-lg">{category.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-100 text-sm">
              © 2024 Saram Jewels. All Rights Reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-amber-200 hover:text-amber-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
