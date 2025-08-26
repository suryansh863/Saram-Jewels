import React from 'react';

const ProductList = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Product Listing</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Product cards will go here */}
      <div className="bg-white rounded-lg shadow p-4">Product 1</div>
      <div className="bg-white rounded-lg shadow p-4">Product 2</div>
      <div className="bg-white rounded-lg shadow p-4">Product 3</div>
    </div>
  </div>
);

export default ProductList;
