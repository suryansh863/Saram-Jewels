const { Product, Category } = require('../models');

const seedProducts = async () => {
  try {
    // Get category IDs
    const categories = await Category.findAll();
    const categoryMap = {};
    
    categories.forEach(category => {
      categoryMap[category.name] = category.id;
    });
    
    // Sample products data
    const productsData = [
      // Rings
      {
        name: 'Classic Solitaire Ring',
        description: 'A timeless solitaire American Diamond ring that never goes out of style. Anti-tarnish and perfect for everyday wear.',
        price: 599,
        category_id: categoryMap['Rings'],
        images: ['ring1.jpg', 'ring1-2.jpg', 'ring1-3.jpg'],
        stock: 15,
        is_featured: true
      },
      {
        name: 'Princess Cut Halo Ring',
        description: 'Beautiful princess cut American Diamond with halo setting. Anti-tarnish and perfect for engagements.',
        price: 899,
        category_id: categoryMap['Rings'],
        images: ['ring2.jpg', 'ring2-2.jpg'],
        stock: 10
      },
      {
        name: 'Elegant Band Ring',
        description: 'Simple yet elegant American Diamond band ring. Anti-tarnish and perfect for everyday wear.',
        price: 299,
        category_id: categoryMap['Rings'],
        images: ['ring3.jpg'],
        stock: 20
      },
      
      // Necklaces
      {
        name: 'Classic Pendant Necklace',
        description: 'Elegant American Diamond pendant necklace with a simple chain. Anti-tarnish and perfect for any occasion.',
        price: 1499,
        category_id: categoryMap['Necklace'],
        images: ['necklace1.jpg', 'necklace1-2.jpg'],
        stock: 8,
        is_featured: true
      },
      {
        name: 'Statement Collar Necklace',
        description: 'Bold and beautiful American Diamond collar necklace. Anti-tarnish and perfect for special occasions.',
        price: 3499,
        category_id: categoryMap['Necklace'],
        images: ['necklace2.jpg'],
        stock: 5
      },
      
      // Earrings
      {
        name: 'Stud Earrings',
        description: 'Classic American Diamond stud earrings. Anti-tarnish and perfect for everyday wear.',
        price: 399,
        category_id: categoryMap['Earrings'],
        images: ['earring1.jpg', 'earring1-2.jpg'],
        stock: 25,
        is_featured: true
      },
      {
        name: 'Drop Earrings',
        description: 'Elegant American Diamond drop earrings. Anti-tarnish and perfect for special occasions.',
        price: 899,
        category_id: categoryMap['Earrings'],
        images: ['earring2.jpg'],
        stock: 12
      },
      
      // Chains
      {
        name: 'Tennis Chain',
        description: 'Classic American Diamond tennis chain. Anti-tarnish and perfect for any outfit.',
        price: 1299,
        category_id: categoryMap['Chains'],
        images: ['chain1.jpg', 'chain1-2.jpg'],
        stock: 7,
        is_featured: true
      },
      {
        name: 'Cuban Link Chain',
        description: 'Bold American Diamond Cuban link chain. Anti-tarnish and perfect for a statement look.',
        price: 1699,
        category_id: categoryMap['Chains'],
        images: ['chain2.jpg'],
        stock: 9
      },
      
      // Bracelets
      {
        name: 'Tennis Bracelet',
        description: 'Classic American Diamond tennis bracelet. Anti-tarnish and perfect for any occasion.',
        price: 899,
        category_id: categoryMap['Bracelets'],
        images: ['bracelet1.jpg', 'bracelet1-2.jpg'],
        stock: 10,
        is_featured: true
      },
      {
        name: 'Bangle Bracelet',
        description: 'Elegant American Diamond bangle bracelet. Anti-tarnish and perfect for special occasions.',
        price: 699,
        category_id: categoryMap['Bracelets'],
        images: ['bracelet2.jpg'],
        stock: 15
      },
      
      // Necklace Sets
      {
        name: 'Bridal Necklace Set',
        description: 'Complete American Diamond bridal necklace set including necklace, earrings, and maang tikka. Anti-tarnish and perfect for weddings.',
        price: 4999,
        category_id: categoryMap['Necklace Set'],
        images: ['necklaceset1.jpg', 'necklaceset1-2.jpg'],
        stock: 3,
        is_featured: true
      },
      {
        name: 'Party Necklace Set',
        description: 'Beautiful American Diamond party necklace set including necklace and earrings. Anti-tarnish and perfect for parties.',
        price: 2499,
        category_id: categoryMap['Necklace Set'],
        images: ['necklaceset2.jpg'],
        stock: 7
      },
      
      // Gift Box Sets
      {
        name: 'Anniversary Gift Box',
        description: 'Special American Diamond Anniversary Gift Box including necklace and earrings. Anti-tarnish and perfect for anniversary gifts.',
        price: 1000,
        category_id: categoryMap['Gift Box Set'],
        images: ['giftbox1.jpg', 'giftbox1-2.jpg'],
        stock: 20,
        is_featured: true
      },
      {
        name: 'Birthday Gift Box',
        description: 'Special American Diamond Birthday Gift Box including necklace and earrings. Anti-tarnish and perfect for birthday gifts.',
        price: 1000,
        category_id: categoryMap['Gift Box Set'],
        images: ['giftbox2.jpg'],
        stock: 20
      }
    ];
    
    await Product.bulkCreate(productsData);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = seedProducts;
