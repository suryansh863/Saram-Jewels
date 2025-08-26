const sequelize = require('../config/database');
const { Category } = require('../models');
const seedProducts = require('./productSeeder');

const categoriesData = [
  { 
    name: 'Rings', 
    description: 'Beautiful American Diamond rings that are anti-tarnish and affordable', 
    image: 'rings-category.jpg' 
  },
  { 
    name: 'Necklace', 
    description: 'Elegant American Diamond necklaces for all occasions', 
    image: 'necklace-category.jpg' 
  },
  { 
    name: 'Earrings', 
    description: 'Stunning American Diamond earrings that sparkle like real diamonds', 
    image: 'earrings-category.jpg' 
  },
  { 
    name: 'Chains', 
    description: 'Anti-tarnish American Diamond chains for everyday wear', 
    image: 'chains-category.jpg' 
  },
  { 
    name: 'Bracelets', 
    description: 'Elegant American Diamond bracelets that add a touch of luxury', 
    image: 'bracelets-category.jpg' 
  },
  { 
    name: 'Necklace Set', 
    description: 'Complete American Diamond necklace sets for special occasions', 
    image: 'necklace-set-category.jpg' 
  },
  { 
    name: 'Gift Box Set', 
    description: 'Special Gift Box Sets including Necklace + Earring combo at ₹1000', 
    image: 'gift-box-category.jpg' 
  }
];

const seedCategories = async () => {
  try {
    await Category.bulkCreate(categoriesData);
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

const seedDatabase = async () => {
  try {
    // Sync models with database
    await sequelize.sync({ force: true });
    console.log('Database synced');
    
    // Seed categories
    await seedCategories();
    
    // Seed products
    await seedProducts();
    
    console.log('All seeds completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();
