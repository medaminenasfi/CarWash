# NestJS Starter Project

A production-ready, enterprise-grade NestJS boilerplate with clean architecture, featuring JWT authentication, TypeORM + PostgreSQL, multi-runtime support (Node.js/Bun/Deno), CQRS pattern, internationalization (i18n), and comprehensive documentation.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v22.0.0 or higher) - [Download](https://nodejs.org/)
- **Yarn** (v1.22.22 or higher) - [Install Guide](https://yarnpkg.com/getting-started/install)
- **Git** - [Download](https://git-scm.com/)
- **Docker** (optional, for database) - [Get Docker](https://www.docker.com/get-started)

### 1️⃣ Installation & Setup

```bash
# Navigate to your project directory
cd nest-starter

# Install all dependencies
yarn install
```

### 2️⃣ Environment Configuration

The `.env` file is already configured with default values. Review and customize if needed:

```env
#== APPLICATION
NODE_ENV=development          # Environment: development, staging, production
PORT=3000                     # Server port
ENABLE_DOCUMENTATION=true     # Swagger UI at /documentation
ENABLE_ORM_LOGS=true          # Database query logging

#== DATABASE (Docker PostgreSQL)
DB_HOST=127.0.0.1
DB_PORT=5434
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_DATABASE=hellobrickdb

#== JWT AUTHENTICATION (RS256 Algorithm)
JWT_EXPIRATION_TIME=3600      # Token expiration in seconds (1 hour)
JWT_PRIVATE_KEY=...           # RSA private key (pre-configured)
JWT_PUBLIC_KEY=...            # RSA public key (pre-configured)

#== OPTIONAL FEATURES
NATS_ENABLED=false            # Microservices support
REDIS_CACHE_ENABLED=true      # Redis caching
THROTTLER_TTL=1m              # Rate limit time window
THROTTLER_LIMIT=10            # Max requests per window
```

⚠️ **Security Note**: The included JWT keys are sample keys. For production, generate your own:
```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

### 3️⃣ Start Database (Using Docker)

```bash
# Start PostgreSQL and pgAdmin containers
docker-compose up -d

# Verify containers are running
docker ps

# Stop containers when needed
docker-compose down
```

**Access pgAdmin** (Database UI):
- URL: http://localhost:5050
- Email: `admin@admin.com`
- Password: `admin123`

### 4️⃣ Run Database Migrations

Migrations will run automatically on first startup, or manually:

```bash
# Generate new migration (after entity changes)
yarn migration:generate src/database/migrations/add-feature-table

# Run migrations
yarn migration:run

# Revert last migration
yarn migration:revert

# Drop all tables (development only!)
yarn schema:drop
```

### 5️⃣ Start Development Server

Choose your preferred runtime:

#### Option A: Vite Development Server (Recommended ⚡)
```bash
yarn start:dev
```
**Features:**
- Instant hot module replacement (HMR)
- Fastest development experience
- Uses SWC compiler

#### Option B: NestJS CLI
```bash
yarn nest:start:dev
```

#### Option C: With Debugger
```bash
yarn nest:start:debug
```
Then attach VS Code debugger to port `9229`

#### Option D: Bun Runtime
```bash
bun start:dev:bun
bun watch:bun
```

#### Option E: Deno Runtime
```bash
deno task start
deno task watch
```

### 6️⃣ Verify Everything Works

✅ **Server Running**: Visit http://localhost:3000  
✅ **API Documentation**: Visit http://localhost:3000/documentation  
✅ **Health Check**: Visit http://localhost:3000/health  

### 7️⃣ Test Authentication Endpoints

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test"
  }'

# Login and get JWT token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 📋 Project Initialization Checklist

When starting a NEW project from this template:

### Initial Setup
- [ ] **Update `package.json`**
  ```json
  {
    "name": "your-project-name",
    "description": "Your project description",
    "author": "Your Name <your.email@example.com>"
  }
  ```

- [ ] **Update `LICENSE`** - Add your name/copyright

- [ ] **Customize `.env`** - Configure for your needs

- [ ] **Generate new JWT keys** (for production)

- [ ] **Remove sample modules** (if not needed)

- [ ] **Configure CORS origins** in `src/main.ts`:
  ```typescript
  cors: {
    origin: ['http://localhost:3000', 'https://yourapp.com'],
    credentials: true,
  }
  ```

### Optional Cleanup
- [ ] Remove `.github` folder (contains funding info)
- [ ] Delete `docs/` if not needed
- [ ] Remove sample entities (Post, User modules)

---

## 🛠️ Available Scripts

### Development
```bash
yarn start:dev              # Vite dev server (recommended)
yarn nest:start:dev         # NestJS watch mode
yarn nest:start:debug       # With debugger attached
yarn watch:dev              # File watching
```

### Production
```bash
yarn build:prod             # Build for production
yarn start:prod             # Run production build
```

### Testing
```bash
yarn test                   # Run unit tests
yarn test:watch             # Watch mode
yarn test:cov               # Coverage report
yarn test:e2e               # E2E tests
yarn test:debug             # Debug tests
```

### Code Quality
```bash
yarn lint                   # Check code style
yarn lint:fix               # Auto-fix issues
yarn prepare                # Install Husky hooks
```

### Database Operations
```bash
yarn migration:generate     # Generate migration from entities
yarn migration:create       # Create empty migration
yarn migration:run          # Run pending migrations
yarn migration:revert       # Rollback last migration
yarn schema:drop            # Drop all tables
```

### Documentation
```bash
yarn docs:dev               # View docs locally (port 7070)
yarn docs:build             # Build static docs
yarn docs:deploy            # Deploy to GitHub Pages
```

### Release Management
```bash
yarn release                # Automated release with version bump
```

---

## 🏗️ Architecture Overview

### Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | NestJS v11 |
| **Language** | TypeScript (ESNext) |
| **Database** | PostgreSQL + TypeORM |
| **Authentication** | JWT (RS256) + Passport |
| **Validation** | class-validator, class-transformer |
| **Security** | Helmet, CORS, Rate Limiting |
| **Documentation** | Swagger/OpenAPI |
| **Microservices** | NATS transport |
| **I18n** | nestjs-i18n |
| **Build Tool** | Vite + SWC |
| **Testing** | Jest + ts-jest |
| **Linting** | ESLint v9 + Prettier |

### Design Patterns

- **CQRS** (Command Query Responsibility Segregation)
- **Repository Pattern** (TypeORM repositories)
- **Dependency Injection** (NestJS DI)
- **Entity-DTO Mapping** (Auto-transformation)
- **Clean Architecture** (Domain-Driven Design)

### Project Structure

```
nest-starter/
├── src/
│   ├── common/                 # Shared utilities
│   │   ├── dto/               # Base DTOs
│   │   └── abstract.entity.ts # Base entity
│   ├── constants/             # App-wide constants
│   ├── database/migrations/   # TypeORM migrations
│   ├── decorators/            # Custom decorators
│   ├── entity-subscribers/    # Entity event listeners
│   ├── exceptions/            # Custom exceptions
│   ├── filters/               # Exception filters
│   ├── guards/                # Auth guards
│   ├── i18n/                  # Translations
│   ├── interceptors/          # Request/response interceptors
│   ├── interfaces/            # TypeScript interfaces
│   ├── modules/               # Feature modules
│   │   ├── auth/             # Authentication
│   │   ├── user/             # User management
│   │   ├── post/             # Post management
│   │   └── health-checker/   # Health monitoring
│   ├── providers/             # Custom providers
│   ├── shared/                # Shared services
│   │   └── services/         # Global services
│   ├── validators/            # Custom validators
│   ├── app.module.ts         # Root module
│   ├── main.ts               # Entry point
│   └── setup-swagger.ts      # Swagger config
├── test/                      # E2E tests
├── docs/                      # Documentation
├── docker-compose.yml         # Docker services
└── package.json              # Dependencies
```

---

## 🔐 Security Features

### Authentication & Authorization
- **JWT with RS256** (asymmetric encryption)
- **Role-Based Access Control (RBAC)**
- **Public/Private route guards**
- **Automatic password hashing**

### Security Headers & Protection
- **Helmet**: Security headers
- **CORS**: Configurable origins
- **Rate Limiting**: Request throttling
- **Input Validation**: Comprehensive DTO validation
- **SQL Injection Prevention**: Parameterized queries

---

## 🌍 Internationalization (i18n)

Multi-language support with automatic translation:

```typescript
// Translation files in src/i18n/
├── en_US/admin.json
└── ru_RU/admin.json

// Usage in code
throw new UserNotFoundException('error.user_not_found');

// Dynamic translation in DTOs
@dynamicTranslate()
title?: string;
```

**Language Detection:**
- Query parameter: `?lang=en_US`
- Header: `x-lang: en_US`
- Accept-Language header

---

## 📊 Database Features

### TypeORM Configuration
- **Snake Case Naming**: Automatic camelCase → snake_case conversion
- **Migrations**: Version-controlled schema changes
- **Entity Subscribers**: Automatic operations (e.g., password hashing)
- **Transactions**: Decorator-based (`@Transactional()`)

### Entity Relationships
```typescript
// One-to-Many
@OneToMany(() => PostEntity, post => post.user)
posts?: PostEntity[];

// Many-to-One with cascade
@ManyToOne(() => UserEntity, user => user.posts, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
@JoinColumn({ name: 'user_id' })
user!: Relation<UserEntity>;
```

---

## 🧪 Testing Strategy

### Test Types
1. **Unit Tests**: Individual components (`*.spec.ts`)
2. **Integration Tests**: Module interactions
3. **E2E Tests**: Full application flow

### Running Tests
```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# With coverage
yarn test:cov
```

---

## 🎯 Code Generation

Generate boilerplate code with custom schematics:

```bash
# Generate module
yarn generate module feature_name

# Generate controller
yarn generate controller feature_name

# Generate service
yarn generate service feature_name

# Shorthand
yarn g module feature_name
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:5434
```
**Solution:**
```bash
# Check Docker containers
docker ps

# Restart PostgreSQL
docker-compose restart postgres

# Recreate containers
docker-compose down; docker-compose up -d
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process or change PORT in .env
```

### Module Not Found
```
Error: Cannot find module '@nestjs/common'
```
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install
```

### Migration Issues
```
Error: Table 'users' already exists
```
**Solution:**
```bash
# Drop and rerun
yarn schema:drop
yarn migration:run
```

---

## 📖 Documentation

Detailed guides available in the `docs/` folder:

1. **[Architecture](./docs/architecture.md)** - Design patterns and structure
2. **[Development](./docs/development.md)** - Docker setup and workflows
3. **[Code Style](./docs/code-style-and-patterns.md)** - Best practices
4. **[Naming Cheatsheet](./docs/naming-cheatsheet.md)** - Convention reference
5. **[Testing](./docs/testing.md)** - Testing strategies
6. **[Deployment](./docs/deployment.md)** - Production deployment
7. **[API Documentation](./docs/api-documentation.md)** - Swagger guide
8. **[Linting](./docs/linting.md)** - ESLint configuration

---

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
ENABLE_DOCUMENTATION=false      # Disable Swagger
ENABLE_ORM_LOGS=false           # Disable DB logs
CORS_ORIGINS=https://yourapp.com
```

### Build & Run
```bash
# Build
yarn build:prod

# Start
yarn start:prod
```

### Docker Deployment
```bash
# Build Docker image
docker build -t your-app .

# Run container
docker run -p 3000:3000 --env-file .env your-app
```

---

## 📦 Multi-Runtime Support

### Node.js (Default)
Most stable with full ecosystem support.
```bash
yarn start:dev
yarn build:prod && yarn start:prod
```

### Bun (High Performance)
Faster alternative with built-in bundler.
```bash
bun start:dev:bun
bun watch:bun
bun build:bun
```

### Deno (Secure TypeScript)
Built-in tooling and security.
```bash
deno task start
deno task watch
deno task buildr
```

---

## 🎨 Best Practices

### Code Quality Standards
- ✅ **Single Responsibility**: One purpose per class/module
- ✅ **DRY Principle**: Reusable components
- ✅ **Type Safety**: Strict TypeScript
- ✅ **Early Returns**: Reduce nesting
- ✅ **Explicit Error Handling**: Meaningful exceptions
- ✅ **KISS**: Keep it simple

### Naming Conventions
- Entities: `*Entity` suffix
- DTOs: `*Dto` suffix
- Commands: `*Command` suffix
- Handlers: `*Handler` suffix
- Services: `*Service` suffix

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- And many other amazing open-source libraries!

---

## 📞 Support & Community

- **GitHub Issues**: Report bugs and feature requests
- **Discussions**: Ask questions and share ideas
- **Documentation**: Comprehensive guides in `docs/` folder

---

<div align="center">

**Made with ❤️ by [Your Name]**

⭐ Star this repo if you find it helpful!

</div>
