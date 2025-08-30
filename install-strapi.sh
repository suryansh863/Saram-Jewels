#!/bin/bash

# Strapi Installation Script for Saram Jewels
# This script will install and configure Strapi CMS

echo "🚀 Starting Strapi CMS installation for Saram Jewels..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Navigate to project root
cd /c/Users/surya/Saram-Jewels

# Create Strapi project
echo "📦 Creating Strapi project..."
npx create-strapi-app@latest strapi-backend --quickstart --no-run

if [ $? -ne 0 ]; then
    echo "❌ Failed to create Strapi project"
    exit 1
fi

echo "✅ Strapi project created successfully"

# Navigate to Strapi directory
cd strapi-backend

# Install additional dependencies
echo "📦 Installing additional dependencies..."
npm install @clerk/clerk-sdk-node jsonwebtoken axios

# Create environment file
echo "🔧 Creating environment configuration..."
cat > .env << EOF
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=saram_jewels_strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here

# JWT
JWT_SECRET=your_jwt_secret_here

# Admin
ADMIN_JWT_SECRET=your_admin_jwt_secret_here

# Clerk Configuration
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_JWT_PUBLIC_KEY=your_clerk_jwt_public_key_here

# API Token
API_TOKEN_SALT=your_api_token_salt_here
TRANSFER_TOKEN_SALT=your_transfer_token_salt_here

# App Keys
APP_KEYS=your_app_keys_here
EOF

echo "✅ Environment file created"

# Create custom plugin directory
echo "🔌 Setting up custom plugins..."
mkdir -p src/plugins/clerk-auth

# Copy Clerk plugin files
cp ../strapi-clerk-plugin/package.json src/plugins/clerk-auth/
cp ../strapi-clerk-plugin/src/index.js src/plugins/clerk-auth/

# Install plugin dependencies
cd src/plugins/clerk-auth
npm install

cd ../../..

# Create content types configuration
echo "📝 Creating content types configuration..."
mkdir -p src/api

# Create Product content type
mkdir -p src/api/product/content-types/product
cat > src/api/product/content-types/product/schema.json << EOF
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product",
    "description": "Jewelry products"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "richtext"
    },
    "price": {
      "type": "decimal",
      "required": true
    },
    "stock": {
      "type": "integer",
      "required": true,
      "default": 0
    },
    "images": {
      "type": "media",
      "multiple": true,
      "required": false,
      "allowedTypes": ["images"]
    },
    "is_featured": {
      "type": "boolean",
      "default": false
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "products"
    }
  }
}
EOF

# Create Category content type
mkdir -p src/api/category/content-types/category
cat > src/api/category/content-types/category/schema.json << EOF
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category",
    "description": "Product categories"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "products": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::product.product",
      "mappedBy": "category"
    }
  }
}
EOF

# Create User content type (extended)
mkdir -p src/api/user/content-types/user
cat > src/api/user/content-types/user/schema.json << EOF
{
  "kind": "collectionType",
  "collectionName": "users",
  "info": {
    "singularName": "user",
    "pluralName": "users",
    "displayName": "User",
    "description": "Extended user information"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "clerk_user_id": {
      "type": "string",
      "unique": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "phone": {
      "type": "string"
    }
  }
}
EOF

# Create Order content type
mkdir -p src/api/order/content-types/order
cat > src/api/order/content-types/order/schema.json << EOF
{
  "kind": "collectionType",
  "collectionName": "orders",
  "info": {
    "singularName": "order",
    "pluralName": "orders",
    "displayName": "Order",
    "description": "Customer orders"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "order_number": {
      "type": "string",
      "unique": true
    },
    "user": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::user.user"
    },
    "items": {
      "type": "json"
    },
    "total_amount": {
      "type": "decimal"
    },
    "status": {
      "type": "enumeration",
      "enum": ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    },
    "shipping_address": {
      "type": "json"
    },
    "payment_status": {
      "type": "enumeration",
      "enum": ["pending", "paid", "failed"]
    },
    "razorpay_order_id": {
      "type": "string"
    }
  }
}
EOF

# Create Contact content type
mkdir -p src/api/contact/content-types/contact
cat > src/api/contact/content-types/contact/schema.json << EOF
{
  "kind": "collectionType",
  "collectionName": "contacts",
  "info": {
    "singularName": "contact",
    "pluralName": "contacts",
    "displayName": "Contact",
    "description": "Contact form submissions"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "subject": {
      "type": "string"
    },
    "message": {
      "type": "text",
      "required": true
    }
  }
}
EOF

echo "✅ Content types created"

# Update frontend environment
echo "🔧 Updating frontend environment..."
cd ../frontend

# Create .env file for frontend
cat > .env << EOF
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_api_token_here
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
EOF

echo "✅ Frontend environment updated"

# Install migration script dependencies
cd ..
npm install pg axios dotenv

echo "✅ Migration script dependencies installed"

echo ""
echo "🎉 Strapi CMS installation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update the .env files with your actual database and API credentials"
echo "2. Start Strapi: cd strapi-backend && npm run develop"
echo "3. Access Strapi admin: http://localhost:1337/admin"
echo "4. Create your admin account"
echo "5. Set up permissions and roles"
echo "6. Run the migration script: node migration-script.js"
echo "7. Update your frontend to use the new API service"
echo ""
echo "📚 For more information, see strapi-setup.md"

