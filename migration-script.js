
const { Pool } = require('pg');
const axios = require('axios');
require('dotenv').config();

// Database configuration for your current setup
const currentDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'saram_jewels',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
};

// Strapi API configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

class DataMigration {
  constructor() {
    this.currentDb = new Pool(currentDbConfig);
    this.strapiClient = axios.create({
      baseURL: STRAPI_URL,
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async migrateCategories() {
    console.log('🔄 Migrating categories...');
    
    try {
      const result = await this.currentDb.query('SELECT * FROM categories');
      const categories = result.rows;

      for (const category of categories) {
        const categoryData = {
          data: {
            name: category.name,
            description: category.description || '',
            slug: this.generateSlug(category.name),
            publishedAt: new Date().toISOString(),
          }
        };

        await this.strapiClient.post('/api/categories', categoryData);
        console.log(`✅ Migrated category: ${category.name}`);
      }

      console.log(`✅ Successfully migrated ${categories.length} categories`);
    } catch (error) {
      console.error('❌ Error migrating categories:', error.message);
    }
  }

  async migrateProducts() {
    console.log('🔄 Migrating products...');
    
    try {
      const result = await this.currentDb.query(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        JOIN categories c ON p.category_id = c.id
      `);
      const products = result.rows;

      // Get categories from Strapi to map IDs
      const categoriesResponse = await this.strapiClient.get('/api/categories');
      const categories = categoriesResponse.data.data;
      const categoryMap = {};
      
      categories.forEach(cat => {
        categoryMap[cat.attributes.name] = cat.id;
      });

      for (const product of products) {
        const productData = {
          data: {
            name: product.name,
            description: product.description || '',
            price: parseFloat(product.price),
            stock: product.stock,
            is_featured: product.is_featured,
            slug: this.generateSlug(product.name),
            category: categoryMap[product.category_name],
            publishedAt: new Date().toISOString(),
          }
        };

        // Handle images if they exist
        if (product.images && product.images.length > 0) {
          // You'll need to upload images to Strapi's media library
          // This is a simplified version - you might need to handle file uploads
          productData.data.images = product.images;
        }

        await this.strapiClient.post('/api/products', productData);
        console.log(`✅ Migrated product: ${product.name}`);
      }

      console.log(`✅ Successfully migrated ${products.length} products`);
    } catch (error) {
      console.error('❌ Error migrating products:', error.message);
    }
  }

  async migrateUsers() {
    console.log('🔄 Migrating users...');
    
    try {
      const result = await this.currentDb.query('SELECT * FROM users');
      const users = result.rows;

      for (const user of users) {
        const userData = {
          data: {
            clerk_user_id: user.clerk_user_id || user.id,
            email: user.email,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            phone: user.phone || '',
            publishedAt: new Date().toISOString(),
          }
        };

        await this.strapiClient.post('/api/users', userData);
        console.log(`✅ Migrated user: ${user.email}`);
      }

      console.log(`✅ Successfully migrated ${users.length} users`);
    } catch (error) {
      console.error('❌ Error migrating users:', error.message);
    }
  }

  async migrateOrders() {
    console.log('🔄 Migrating orders...');
    
    try {
      const result = await this.currentDb.query(`
        SELECT o.*, u.email as user_email 
        FROM orders o 
        JOIN users u ON o.user_id = u.id
      `);
      const orders = result.rows;

      // Get users from Strapi to map IDs
      const usersResponse = await this.strapiClient.get('/api/users');
      const users = usersResponse.data.data;
      const userMap = {};
      
      users.forEach(user => {
        userMap[user.attributes.email] = user.id;
      });

      for (const order of orders) {
        const orderData = {
          data: {
            order_number: order.order_number,
            user: userMap[order.user_email],
            items: order.items || [],
            total_amount: parseFloat(order.total_amount),
            status: order.status || 'pending',
            shipping_address: order.shipping_address || {},
            payment_status: order.payment_status || 'pending',
            razorpay_order_id: order.razorpay_order_id || '',
            publishedAt: new Date().toISOString(),
          }
        };

        await this.strapiClient.post('/api/orders', orderData);
        console.log(`✅ Migrated order: ${order.order_number}`);
      }

      console.log(`✅ Successfully migrated ${orders.length} orders`);
    } catch (error) {
      console.error('❌ Error migrating orders:', error.message);
    }
  }

  generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  async runMigration() {
    console.log('🚀 Starting data migration to Strapi...');
    
    try {
      await this.migrateCategories();
      await this.migrateProducts();
      await this.migrateUsers();
      await this.migrateOrders();
      
      console.log('🎉 Migration completed successfully!');
    } catch (error) {
      console.error('❌ Migration failed:', error.message);
    } finally {
      await this.currentDb.end();
    }
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  const migration = new DataMigration();
  migration.runMigration();
}

module.exports = DataMigration;

