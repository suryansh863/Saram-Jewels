import React from 'react';

const Categories = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Jewelry Categories</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {/* Category cards will go here */}
      <div className="bg-white rounded-lg shadow p-4">Rings</div>
      <div className="bg-white rounded-lg shadow p-4">Necklace</div>
      <div className="bg-white rounded-lg shadow p-4">Earrings</div>
      <div className="bg-white rounded-lg shadow p-4">Chains</div>
      <div className="bg-white rounded-lg shadow p-4">Bracelets</div>
      <div className="bg-white rounded-lg shadow p-4">Necklace Set</div>
      <div className="bg-yellow-100 rounded-lg shadow p-4 border-2 border-yellow-400">Gift Box Set</div>
    </div>
  </div>
);

export default Categories;
