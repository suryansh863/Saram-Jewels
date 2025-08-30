# Strapi Installation Script for Saram Jewels (PowerShell)
# This script will install and configure Strapi CMS on Windows

Write-Host "🚀 Starting Strapi CMS installation for Saram Jewels..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check Node.js version
$nodeMajorVersion = (node --version).Split('v')[1].Split('.')[0]
if ([int]$nodeMajorVersion -lt 18) {
    Write-Host "❌ Node.js version 18+ is required. Current version: $(node --version)" -ForegroundColor Red
    exit 1
}

# Navigate to project root
Set-Location "C:\Users\surya\Saram-Jewels"

# Create Strapi project
Write-Host "📦 Creating Strapi project..." -ForegroundColor Yellow
npx create-strapi-app@latest strapi-backend --quickstart --no-run

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create Strapi project" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Strapi project created successfully" -ForegroundColor Green

# Navigate to Strapi directory
Set-Location "strapi-backend"

# Install additional dependencies
Write-Host "📦 Installing additional dependencies..." -ForegroundColor Yellow
npm install @clerk/clerk-sdk-node jsonwebtoken axios

# Create environment file
Write-Host "🔧 Creating environment configuration..." -ForegroundColor Yellow
@"
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
"@ | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Environment file created" -ForegroundColor Green

# Create custom plugin directory
Write-Host "🔌 Setting up custom plugins..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "src\plugins\clerk-auth" -Force

# Copy Clerk plugin files
Copy-Item "..\strapi-clerk-plugin\package.json" "src\plugins\clerk-auth\"
Copy-Item "..\strapi-clerk-plugin\src\index.js" "src\plugins\clerk-auth\"

# Install plugin dependencies
Set-Location "src\plugins\clerk-auth"
npm install
Set-Location "..\..\.."

# Create content types configuration
Write-Host "📝 Creating content types configuration..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "src\api" -Force

# Create Product content type
New-Item -ItemType Directory -Path "src\api\product\content-types\product" -Force
@"
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
"@ | Out-File -FilePath "src\api\product\content-types\product\schema.json" -Encoding UTF8

# Create Category content type
New-Item -ItemType Directory -Path "src\api\category\content-types\category" -Force
@"
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
"@ | Out-File -FilePath "src\api\category\content-types\category\schema.json" -Encoding UTF8

# Create User content type (extended)
New-Item -ItemType Directory -Path "src\api\user\content-types\user" -Force
@"
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
"@ | Out-File -FilePath "src\api\user\content-types\user\schema.json" -Encoding UTF8

# Create Order content type
New-Item -ItemType Directory -Path "src\api\order\content-types\order" -Force
@"
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
"@ | Out-File -FilePath "src\api\order\content-types\order\schema.json" -Encoding UTF8

# Create Contact content type
New-Item -ItemType Directory -Path "src\api\contact\content-types\contact" -Force
@"
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
"@ | Out-File -FilePath "src\api\contact\content-types\contact\schema.json" -Encoding UTF8

Write-Host "✅ Content types created" -ForegroundColor Green

# Update frontend environment
Write-Host "🔧 Updating frontend environment..." -ForegroundColor Yellow
Set-Location "..\frontend"

# Create .env file for frontend
@"
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_api_token_here
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
"@ | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✅ Frontend environment updated" -ForegroundColor Green

# Install migration script dependencies
Set-Location ".."
npm install pg axios dotenv

Write-Host "✅ Migration script dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Strapi CMS installation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update the .env files with your actual database and API credentials"
Write-Host "2. Start Strapi: cd strapi-backend && npm run develop"
Write-Host "3. Access Strapi admin: http://localhost:1337/admin"
Write-Host "4. Create your admin account"
Write-Host "5. Set up permissions and roles"
Write-Host "6. Run the migration script: node migration-script.js"
Write-Host "7. Update your frontend to use the new API service"
Write-Host ""
Write-Host "📚 For more information, see strapi-setup.md" -ForegroundColor Cyan

