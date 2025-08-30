# Quick Start Guide - Strapi CMS Integration

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- PostgreSQL running
- Your existing Saram Jewels project

### Step 1: Run Installation Script

**For Windows (PowerShell):**
```powershell
.\install-strapi.ps1
```

**For Linux/Mac:**
```bash
chmod +x install-strapi.sh
./install-strapi.sh
```

### Step 2: Configure Environment Variables

1. **Update Strapi `.env` file** (`strapi-backend/.env`):
```env
DATABASE_PASSWORD=your_actual_postgres_password
JWT_SECRET=your_random_jwt_secret
ADMIN_JWT_SECRET=your_random_admin_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_PUBLIC_KEY=your_clerk_jwt_public_key
```

2. **Update Frontend `.env` file** (`frontend/.env`):
```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_strapi_api_token
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Step 3: Start Strapi

```bash
cd strapi-backend
npm run develop
```

### Step 4: Access Strapi Admin

1. Open http://localhost:1337/admin
2. Create your admin account
3. Set up permissions for public access to products and categories

### Step 5: Migrate Your Data

```bash
# Update migration script with your database credentials
node migration-script.js
```

### Step 6: Update Frontend

Replace your existing API calls with the new Strapi service:

```javascript
// Old way
import axios from 'axios';
const response = await axios.get('/api/products');

// New way
import apiService from './services/api';
const products = await apiService.getProducts();
```

### Step 7: Test Everything

1. Start your frontend: `cd frontend && npm start`
2. Test product listing, cart, checkout
3. Verify admin panel functionality

## 🔧 Key Benefits You'll Get

✅ **Visual Content Management** - Easy admin panel for managing products
✅ **Media Management** - Built-in image optimization and CDN support  
✅ **API Documentation** - Auto-generated API docs
✅ **Role-Based Access** - Granular permissions
✅ **Better Performance** - Optimized queries and caching
✅ **SEO Features** - Built-in SEO tools
✅ **Scalability** - Better architecture for growth

## 📁 New Project Structure

```
Saram-Jewels/
├── strapi-backend/          # 🆕 Strapi CMS
│   ├── src/api/            # Content types
│   ├── src/plugins/        # Custom plugins
│   └── public/             # Media files
├── frontend/               # Your React app
├── backend/                # Old Express backend (can be removed)
├── migration-script.js     # Data migration tool
└── docs/                   # Documentation
```

## 🎯 What's Different Now

### Before (Express.js)
- Manual API endpoints
- Custom authentication
- Basic admin interface
- Limited content management

### After (Strapi)
- Auto-generated REST/GraphQL APIs
- Visual content management
- Built-in admin panel
- Advanced media management
- Role-based permissions
- Plugin ecosystem

## 🚨 Important Notes

1. **Keep your old backend** until migration is complete
2. **Test thoroughly** before removing old code
3. **Update environment variables** with real credentials
4. **Set up proper permissions** in Strapi admin
5. **Backup your data** before migration

## 🆘 Need Help?

- Check `strapi-setup.md` for detailed documentation
- Review the migration script for data transfer
- Test the new API service with your frontend
- Use Strapi's built-in documentation

## 🎉 You're Ready!

Your jewelry e-commerce site now has a powerful CMS backend with:
- Easy product management
- Visual content editing
- Advanced media handling
- Scalable architecture
- Professional admin interface

Happy coding! 💎

