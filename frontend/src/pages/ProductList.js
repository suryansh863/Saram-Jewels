import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Squares2X2Icon, 
  ListBulletIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  EyeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import ImageZoom from '../components/ui/ImageZoom';

const ProductList = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();
  const location = useLocation();

  // Get search query from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Sample products data
  const products = [
    // Rings
    {
      id: 1,
      name: 'Classic Solitaire Ring',
      description: 'A timeless solitaire American Diamond ring that never goes out of style.',
      price: 599,
      originalPrice: 799,
      category: 'rings',
      images: ['/images/ring1.jpg'],
      rating: 4.8,
      reviews: 124,
      isFeatured: true,
      stock: 15
    },
    {
      id: 2,
      name: 'Princess Cut Halo Ring',
      description: 'Beautiful princess cut American Diamond with halo setting.',
      price: 899,
      originalPrice: 1199,
      category: 'rings',
      images: ['/images/ring2.jpg'],
      rating: 4.6,
      reviews: 89,
      isFeatured: false,
      stock: 10
    },
    {
      id: 3,
      name: 'Elegant American Diamond Ring',
      description: 'This stunning ring features a brilliant American Diamond center stone surrounded by smaller accent stones.',
      price: 899,
      originalPrice: 1299,
      category: 'rings',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop'],
      rating: 4.8,
      reviews: 127,
      isFeatured: true,
      stock: 12
    },
    // Necklaces
    {
      id: 4,
      name: 'Classic Pendant Necklace',
      description: 'Elegant American Diamond pendant necklace with a simple chain.',
      price: 1499,
      originalPrice: 1999,
      category: 'necklace',
      images: ['/images/necklace1.jpg'],
      rating: 4.9,
      reviews: 156,
      isFeatured: true,
      stock: 8
    },
    {
      id: 5,
      name: 'Statement Collar Necklace',
      description: 'Bold and beautiful collar necklace perfect for special occasions.',
      price: 2499,
      originalPrice: 2999,
      category: 'necklace',
      images: ['/images/necklace2.jpg'],
      rating: 4.7,
      reviews: 92,
      isFeatured: false,
      stock: 5
    },
    // Earrings
    {
      id: 6,
      name: 'Stud Earrings Set',
      description: 'Classic stud earrings with brilliant American Diamond stones.',
      price: 399,
      originalPrice: 599,
      category: 'earrings',
      images: ['/images/earrings1.jpg'],
      rating: 4.5,
      reviews: 78,
      isFeatured: false,
      stock: 25
    },
    {
      id: 7,
      name: 'Diamond Stud Earrings',
      description: 'Beautiful diamond stud earrings perfect for everyday wear.',
      price: 599,
      originalPrice: 799,
      category: 'earrings',
      images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop'],
      rating: 4.7,
      reviews: 95,
      isFeatured: true,
      stock: 18
    },
    // Bracelets
    {
      id: 8,
      name: 'Bracelet Collection',
      description: 'Elegant bracelet with beautiful stone work.',
      price: 799,
      originalPrice: 999,
      category: 'bracelets',
      images: ['https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&h=300&fit=crop'],
      rating: 4.6,
      reviews: 67,
      isFeatured: false,
      stock: 14
    },
    {
      id: 9,
      name: 'Necklace Set',
      description: 'Beautiful necklace set with pendant.',
      price: 1299,
      originalPrice: 1599,
      category: 'necklace',
      images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop'],
      rating: 4.9,
      reviews: 112,
      isFeatured: true,
      stock: 9
    },
    {
      id: 10,
      name: 'Pendant Necklace',
      description: 'Elegant pendant necklace with diamond accents.',
      price: 699,
      originalPrice: 899,
      category: 'necklace',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop'],
      rating: 4.8,
      reviews: 89,
      isFeatured: false,
      stock: 16
    }
  ];

  // Filter products based on search query, category, and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        matchesPrice = product.price >= min && product.price <= max;
      } else {
        matchesPrice = product.price >= min;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.isFeatured - a.isFeatured;
    }
  });

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    
    // Show success message
    const event = new CustomEvent('showNotification', {
      detail: {
        message: `${product.name} added to cart!`,
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      // Remove from wishlist logic would go here
      const event = new CustomEvent('showNotification', {
        detail: {
          message: `${product.name} removed from wishlist`,
          type: 'info'
        }
      });
      window.dispatchEvent(event);
    } else {
      addToWishlist(product);
      const event = new CustomEvent('showNotification', {
        detail: {
          message: `${product.name} added to wishlist!`,
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    }
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklace', name: 'Necklaces' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-500', name: 'Under ₹500' },
    { id: '500-1000', name: '₹500 - ₹1000' },
    { id: '1000-2000', name: '₹1000 - ₹2000' },
    { id: '2000-', name: 'Above ₹2000' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-jewelry font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {searchQuery 
              ? `Found ${sortedProducts.length} products matching your search`
              : 'Discover our beautiful collection of jewelry'
            }
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-900 focus:border-transparent"
              />
            </div>

                         {/* Category Filter */}
             <select
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-900 focus:border-transparent"
             >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

                         {/* Price Range Filter */}
             <select
               value={priceRange}
               onChange={(e) => setPriceRange(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-900 focus:border-transparent"
             >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>

                         {/* Sort */}
             <select
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-900 focus:border-transparent"
             >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
                              className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-100 text-green-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
                              className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-100 text-green-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery 
                ? `No products match your search for "${searchQuery}". Try adjusting your filters.`
                : 'No products available in this category.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-900 bg-green-100 hover:bg-green-200"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`overflow-hidden ${
                  viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                }`}>
                  <ImageZoom
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Product Info */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => handleWishlistToggle(product)}
                      className={`p-1 rounded-full transition-colors ${
                        isInWishlist(product.id)
                          ? 'text-red-500 bg-red-50'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <HeartIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-800">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.isFeatured && (
                      <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                        <SparklesIcon className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-900 text-white rounded-lg text-sm font-medium hover:bg-green-950 transition-colors"
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
