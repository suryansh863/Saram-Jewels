# Strapi CMS Integration Guide for Saram Jewels

## Overview
This guide will help you integrate Strapi CMS with your jewelry e-commerce project. Strapi will replace your current Express.js backend and provide a powerful headless CMS with admin panel.

## Prerequisites
- Node.js 18+ 
- PostgreSQL (you're already using this)
- npm or yarn

## Step 1: Install Strapi

```bash
# Navigate to your project root
cd /c/Users/surya/Saram-Jewels

# Create a new Strapi project
npx create-strapi-app@latest strapi-backend --quickstart --no-run

# Or if you prefer to configure manually:
npx create-strapi-app@latest strapi-backend
```

## Step 2: Configure Database

When prompted during Strapi setup, choose:
- Database: PostgreSQL
- Host: localhost
- Port: 5432
- Database name: saram_jewels_strapi (or your preferred name)
- Username: your_postgres_username
- Password: your_postgres_password

## Step 3: Content Types Setup

After Strapi is installed, you'll need to create these content types:

### 1. Product Content Type
- **Name**: Product
- **Fields**:
  - `name` (Text, required)
  - `description` (Rich Text)
  - `price` (Number, required)
  - `stock` (Number, required)
  - `images` (Media, multiple)
  - `is_featured` (Boolean)
  - `category` (Relation to Category)
  - `slug` (UID, based on name)

### 2. Category Content Type
- **Name**: Category
- **Fields**:
  - `name` (Text, required)
  - `description` (Text)
  - `image` (Media, single)
  - `slug` (UID, based on name)

### 3. User Content Type (Extended)
- **Name**: User
- **Fields**:
  - `clerk_user_id` (Text, unique)
  - `email` (Email, required)
  - `first_name` (Text)
  - `last_name` (Text)
  - `phone` (Text)

### 4. Order Content Type
- **Name**: Order
- **Fields**:
  - `order_number` (Text, unique)
  - `user` (Relation to User)
  - `items` (JSON)
  - `total_amount` (Number)
  - `status` (Enumeration: pending, confirmed, shipped, delivered, cancelled)
  - `shipping_address` (JSON)
  - `payment_status` (Enumeration: pending, paid, failed)
  - `razorpay_order_id` (Text)

## Step 4: API Configuration

### Update Frontend API Calls

Replace your current API endpoints with Strapi endpoints:

```javascript
// Old endpoint: /api/products
// New endpoint: http://localhost:1337/api/products

// Old endpoint: /api/categories  
// New endpoint: http://localhost:1337/api/categories
```

### Environment Variables

Create `.env` file in your frontend:

```env
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_api_token_here
```

## Step 5: Data Migration

### Option A: Manual Migration
1. Export data from your current PostgreSQL database
2. Import into Strapi through the admin panel

### Option B: Automated Migration
Use Strapi's import/export functionality or create a migration script.

## Step 6: Authentication Integration

### Clerk + Strapi Integration
Since you're using Clerk for authentication, you'll need to:

1. Create a custom Strapi plugin for Clerk authentication
2. Sync user data between Clerk and Strapi
3. Use JWT tokens for API authentication

## Step 7: Custom Controllers & Services

Create custom controllers for:
- Cart management
- Order processing
- Payment integration (Razorpay)
- Email notifications

## Step 8: File Structure

```
Saram-Jewels/
├── strapi-backend/          # New Strapi CMS
│   ├── api/
│   ├── config/
│   ├── extensions/
│   ├── plugins/
│   └── public/
├── frontend/                # Your existing React app
├── backend/                 # Keep for reference (can be removed later)
└── docs/
```

## Step 9: Development Workflow

1. **Start Strapi**: `cd strapi-backend && npm run develop`
2. **Start Frontend**: `cd frontend && npm start`
3. **Access Strapi Admin**: http://localhost:1337/admin

## Benefits of Strapi Integration

1. **Visual Content Management**: Easy-to-use admin panel
2. **Media Management**: Built-in image optimization and CDN support
3. **Role-Based Access**: Granular permissions
4. **API Documentation**: Auto-generated API docs
5. **Plugin Ecosystem**: Rich ecosystem of plugins
6. **Scalability**: Better performance and scalability
7. **SEO Features**: Built-in SEO tools

## Next Steps

1. Install Strapi following the steps above
2. Set up content types in Strapi admin panel
3. Update frontend API calls to use Strapi endpoints
4. Migrate existing data
5. Test all functionality
6. Deploy to production

## Migration Checklist

- [ ] Install Strapi
- [ ] Configure database connection
- [ ] Create content types
- [ ] Set up permissions and roles
- [ ] Update frontend API calls
- [ ] Migrate existing data
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Deploy to production

## Support

For Strapi-specific issues, refer to:
- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi Community](https://forum.strapi.io/)
- [Strapi GitHub](https://github.com/strapi/strapi)
