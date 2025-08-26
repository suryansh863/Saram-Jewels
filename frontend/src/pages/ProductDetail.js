import React from 'react';

const ProductDetail = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Product Detail</h2>
    <div className="bg-white rounded-lg shadow p-4">
      {/* Product details will go here */}
      <p>Product Name</p>
      <p>Product Description</p>
      <p>Price: ₹1000</p>
    </div>
  </div>
);

export default ProductDetail;
