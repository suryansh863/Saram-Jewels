import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const ProductList = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

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
      name: 'Elegant Band Ring',
      description: 'Simple yet elegant American Diamond band ring.',
      price: 299,
      originalPrice: 399,
      category: 'rings',
      images: ['/images/ring3.jpg'],
      rating: 4.4,
      reviews: 67,
      isFeatured: false,
      stock: 20
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
      reviews: 203,
      isFeatured: false,
      stock: 25
    },
    {
      id: 7,
      name: 'Drop Earrings',
      description: 'Elegant drop earrings with cascading American Diamond stones.',
      price: 799,
      originalPrice: 999,
      category: 'earrings',
      images: ['/images/earrings2.jpg'],
      rating: 4.8,
      reviews: 134,
      isFeatured: true,
      stock: 12
    },
    // Gift Box Sets
    {
      id: 8,
      name: 'Gift Box Set - Necklace & Earrings',
      description: 'Perfect combination of necklace and earrings in a beautiful gift box.',
      price: 1000,
      originalPrice: 1500,
      category: 'gift-box-set',
      images: ['/images/gift-box1.jpg'],
      rating: 4.9,
      reviews: 89,
      isFeatured: true,
      stock: 6
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklace', name: 'Necklaces' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'chains', name: 'Chains' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'necklace-set', name: 'Necklace Sets' },
    { id: 'gift-box-set', name: 'Gift Box Sets' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-500', name: 'Under ₹500' },
    { id: '500-1000', name: '₹500 - ₹1000' },
    { id: '1000-2000', name: '₹1000 - ₹2000' },
    { id: '2000+', name: 'Above ₹2000' }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (priceRange === '2000+') {
        priceMatch = product.price >= 2000;
      } else {
        priceMatch = product.price >= min && product.price <= max;
      }
    }
    
    return categoryMatch && priceMatch;
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

  const ProductCard = ({ product }) => (
    <div className="group relative bg-white rounded-xl shadow-card hover:shadow-jewelry transition-all duration-300 card-hover overflow-hidden">
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="h-10 w-10 text-white" />
            </div>
            <p className="text-gray-600 text-sm">Product Image</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors">
            <HeartIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors">
            <EyeIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-lg font-bold text-pink-600">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {product.stock} left
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-pink-500 text-white text-center py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors">
            <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }) => (
    <div className="flex bg-white rounded-xl shadow-card hover:shadow-jewelry transition-all duration-300 p-4">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <SparklesIcon className="h-8 w-8 text-pink-500" />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 ml-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 hover:text-pink-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-pink-600">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <div className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews})
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link
              to={`/products/${product.id}`}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
            >
              View Details
            </Link>
            <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors">
              <ShoppingCartIcon className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-jewelry font-bold text-gray-800 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our complete collection of American Diamond jewelry
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  } transition-colors`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange('all');
                setSortBy('featured');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
