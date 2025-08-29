import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  StarIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import ImageZoom from '../components/ui/ImageZoom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock product data - in real app this would come from API
  const product = {
    id: parseInt(id),
    name: "Elegant American Diamond Ring",
    description: "This stunning ring features a brilliant American Diamond center stone surrounded by smaller accent stones. The anti-tarnish finish ensures it stays beautiful for years. Perfect for everyday wear or special occasions.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    category: "Rings",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop"
    ],
    specifications: {
      "Material": "925 Silver with Rhodium Plating",
      "Stone": "American Diamond (Cubic Zirconia)",
      "Weight": "2.5 grams",
      "Size": "Adjustable (16-18)",
      "Finish": "Anti-tarnish",
      "Care": "Clean with soft cloth"
    },
    rating: 4.8,
    reviews: 127,
    inStock: true,
    sku: "RING-AD-001"
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Diamond Stud Earrings",
      price: 599,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
      rating: 4.7
    },
    {
      id: 2,
      name: "Necklace Set",
      price: 1299,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop",
      rating: 4.9
    },
    {
      id: 3,
      name: "Bracelet Collection",
      price: 799,
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300&h=300&fit=crop",
      rating: 4.6
    },
    {
      id: 4,
      name: "Pendant Necklace",
      price: 699,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop",
      rating: 4.8
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Priya S.",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely love this ring! The sparkle is amazing and it hasn't tarnished at all. Perfect for daily wear."
    },
    {
      id: 2,
      user: "Anjali M.",
      rating: 4,
      date: "1 week ago",
      comment: "Beautiful design and great quality. The size is adjustable which is perfect. Highly recommend!"
    },
    {
      id: 3,
      user: "Riya K.",
      rating: 5,
      date: "2 weeks ago",
      comment: "This ring exceeded my expectations. The American Diamond looks so real and the finish is impeccable."
    }
  ];

  // Check if product is in wishlist on component mount
  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity: quantity
    };
    addToCart(productWithQuantity);
    
    // Show success message
    const event = new CustomEvent('showNotification', {
      detail: {
        message: `${quantity} ${product.name} added to cart!`,
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  };

  const handleBuyNow = () => {
    // Add to cart first
    const productWithQuantity = {
      ...product,
      quantity: quantity
    };
    addToCart(productWithQuantity);
    
    // Navigate to cart
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      
      // Show notification
      const event = new CustomEvent('showNotification', {
        detail: {
          message: `${product.name} removed from wishlist`,
          type: 'info'
        }
      });
      window.dispatchEvent(event);
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
      
      // Show notification
      const event = new CustomEvent('showNotification', {
        detail: {
          message: `${product.name} added to wishlist!`,
          type: 'success'
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareToSocialMedia = (platform) => {
    const url = window.location.href;
    const text = `Check out this beautiful ${product.name} from Saram Jewelry!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        const event = new CustomEvent('showNotification', {
          detail: {
            message: 'Link copied to clipboard!',
            type: 'success'
          }
        });
        window.dispatchEvent(event);
        setShowShareMenu(false);
        return;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    
    setShowShareMenu(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <StarIconSolid
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-500 hover:text-pink-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-gray-500 hover:text-pink-600">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <ImageZoom
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </ImageZoom>
              
              {/* Zoom indicator */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                <EyeIcon className="h-4 w-4 inline mr-1" />
                Click to zoom
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all w-full ${
                      selectedImage === index
                        ? 'border-pink-500 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {/* Zoom button for thumbnails */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Create a temporary ImageZoom instance
                      const tempZoom = document.createElement('div');
                      tempZoom.innerHTML = `
                        <div class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                          <div class="relative max-w-4xl max-h-[90vh] p-4">
                            <button class="absolute top-2 right-2 z-10 text-white hover:text-gray-300 text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center" onclick="this.parentElement.parentElement.remove()">×</button>
                            <div class="relative overflow-hidden rounded-lg">
                              <img src="${image}" alt="${product.name}" class="w-full h-auto max-h-[80vh] object-contain cursor-zoom-in" style="transform: scale(1); transition: transform 0.3s ease;" onmouseenter="this.style.transform='scale(1.5)';this.style.cursor='zoom-out'" onmouseleave="this.style.transform='scale(1)';this.style.cursor='zoom-in'" onwheel="event.preventDefault();const scale=parseFloat(this.style.transform.replace('scale(','').replace(')',''))||1;const newScale=event.deltaY>0?Math.max(0.5,scale-0.1):Math.min(3,scale+0.1);this.style.transform='scale('+newScale+')'">
                            </div>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(tempZoom);
                    }}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity"
                    title="Zoom"
                  >
                    <EyeIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center space-x-2 relative">
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isWishlisted ? (
                      <HeartIconSolid className="h-5 w-5" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                  <div className="relative">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                      title="Share product"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    
                    {/* Share Menu */}
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <button
                          onClick={() => shareToSocialMedia('whatsapp')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Share on WhatsApp
                        </button>
                        <button
                          onClick={() => shareToSocialMedia('facebook')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Share on Facebook
                        </button>
                        <button
                          onClick={() => shareToSocialMedia('twitter')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Share on Twitter
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={() => shareToSocialMedia('copy')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-jewelry font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-800">
                  ₹{product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    isInCart(product.id)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700'
                  }`}
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TruckIcon className="h-5 w-5 text-green-500" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-jewelry font-bold text-gray-800">
              Customer Reviews
            </h2>
            <button className="btn-secondary">Write a Review</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-800">{review.user}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-jewelry font-bold text-gray-800 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      ₹{relatedProduct.price}
                    </span>
                    <div className="flex items-center">
                      <StarIconSolid className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {relatedProduct.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
