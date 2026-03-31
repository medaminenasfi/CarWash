# CarWash Backend API

A modern RESTful API for CarWash service management built with NestJS.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v22.0.0 or higher) - [Download](https://nodejs.org/)
- **Yarn** (v1.22.22 or higher) - [Install Guide](https://yarnpkg.com/getting-started/install)
- **Git** - [Download](https://git-scm.com/)
- **Docker** (optional, for database) - [Get Docker](https://www.docker.com/get-started)

### 1️⃣ Installation & Setup

```bash
# Navigate to backend directory
cd CarWash/backend

# Install all dependencies
yarn install
```

### 2️⃣ Environment Configuration

```env
#== APPLICATION
NODE_ENV=development
PORT=3000
ENABLE_DOCUMENTATION=true
ENABLE_ORM_LOGS=true

#== DATABASE (PostgreSQL)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=carwash_user
DB_PASSWORD=your_password
DB_DATABASE=carwash_db

#== JWT AUTHENTICATION
JWT_EXPIRATION_TIME=3600
JWT_PRIVATE_KEY=...
JWT_PUBLIC_KEY=...

#== CARWASH SPECIFIC
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=carwash-uploads
```

### 3️⃣ Start Database (Using Docker)

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify container is running
docker ps
```

### 4️⃣ Run Database Migrations

```bash
# Run migrations
yarn migration:run

# Generate new migration
yarn migration:generate src/database/migrations/add-feature-table
```

### 5️⃣ Start Development Server

```bash
# Development mode
yarn start:dev

# Production mode
yarn build:prod
yarn start:prod
```

### 6️⃣ Verify Everything Works

✅ **Server Running**: Visit http://localhost:3000  
✅ **API Documentation**: Visit http://localhost:3000/documentation  
✅ **Health Check**: Visit http://localhost:3000/health  

## 🏗️ CarWash Features

### Core Modules
- **Authentication** - JWT auth with roles
- **Users** - Customer and staff management
- **Services** - Car wash service catalog
- **Bookings** - Appointment scheduling
- **Payments** - Payment processing
- **Notifications** - SMS/Email alerts

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

#### Services
- `GET /api/services` - List car wash services
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

#### Bookings
- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

#### Users
- `GET /api/users` - List users (admin)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile

## 🛠️ Available Scripts

```bash
# Development
yarn start:dev              # Vite dev server (recommended)
yarn nest:start:dev         # NestJS watch mode
yarn nest:start:debug       # With debugger attached

# Production
yarn build:prod             # Build for production
yarn start:prod             # Run production build

# Testing
yarn test                   # Run unit tests
yarn test:watch             # Watch mode
yarn test:cov               # Coverage report
yarn test:e2e               # E2E tests

# Database
yarn migration:generate     # Generate migration from entities
yarn migration:run          # Run pending migrations
yarn migration:revert       # Rollback last migration
yarn schema:drop            # Drop all tables

# Code Quality
yarn lint                   # Check code style
yarn lint:fix               # Auto-fix issues
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── auth/                 # Authentication module
│   ├── users/                # User management
│   ├── services/             # Car wash services
│   ├── bookings/             # Booking system
│   ├── payments/             # Payment processing
│   ├── notifications/        # SMS/Email notifications
│   ├── common/               # Shared utilities
│   │   ├── decorators/       # Custom decorators
│   │   ├── filters/          # Exception filters
│   │   ├── guards/           # Auth guards
│   │   ├── interceptors/     # Request interceptors
│   │   └── validators/       # Custom validators
│   ├── database/migrations/  # TypeORM migrations
│   ├── i18n/                 # Translations
│   └── main.ts              # Application entry point
├── test/                     # E2E tests
├── docker-compose.yml        # Docker services
└── package.json             # Dependencies
```

## 🔐 Security Features

- **JWT Authentication** with RS256 encryption
- **Role-Based Access Control** (Customer, Staff, Admin)
- **Rate Limiting** for API protection
- **Input Validation** with class-validator
- **SQL Injection Prevention** via TypeORM
- **Security Headers** with Helmet

## 📊 Database Schema

### Core Entities
- **User** - Customer and staff accounts
- **Service** - Car wash service types
- **Booking** - Appointment records
- **Payment** - Transaction history
- **Review** - Customer ratings

### Relationships
- User → Bookings (One-to-Many)
- Service → Bookings (One-to-Many)
- Booking → Payment (One-to-One)

## 🌍 Internationalization

Multi-language support:
- English (en_US)
- Arabic (ar_SA) - Ready for car wash business
- French (fr_FR)

## 📱 Frontend Integration

The backend is designed to work seamlessly with the CarWash frontend:

### CORS Configuration
```typescript
// src/main.ts
app.enableCors({
  origin: ['http://localhost:8081', 'https://yourapp.com'],
  credentials: true,
});
```

### API Response Format
```typescript
// Standard response format
{
  "data": {...},
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
ENABLE_DOCUMENTATION=false
ENABLE_ORM_LOGS=false
DB_HOST=your-production-db
JWT_PRIVATE_KEY=your-production-key
```

### Docker Deployment

```bash
# Build Docker image
docker build -t carwash-backend .

# Run container
docker run -p 3000:3000 --env-file .env carwash-backend
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# With coverage
yarn test:cov
```

### Test Structure
- Unit tests for services and controllers
- Integration tests for API endpoints
- E2E tests for complete user flows

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the logs in development mode

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**Made with ❤️ for CarWash Business**

⭐ Star this repo if you find it helpful!

</div>
