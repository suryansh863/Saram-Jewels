const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Use a fallback database URL for development if not provided
const databaseUrl = process.env.DATABASE_URL || 'postgresql://localhost:5432/saram_dev';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.log('Continuing without database connection for development...');
  }
};

testConnection();

module.exports = sequelize;
