# 🚀 DEPLOYMENT GUIDE

Complete guide for deploying your NestJS application to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Build for Production](#build-for-production)
- [Deployment Options](#deployment-options)
  - [Docker Deployment](#docker-deployment)
  - [Traditional VPS/Server](#traditional-vpsserver)
  - [Cloud Platforms](#cloud-platforms)
- [Database Migration in Production](#database-migration-in-production)
- [Monitoring & Health Checks](#monitoring--health-checks)
- [Security Checklist](#security-checklist)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ Node.js v22.0.0+ installed
- ✅ PostgreSQL database (v12+)
- ✅ Environment variables configured
- ✅ Database migrations ready
- ✅ Build tested locally

---

## Environment Configuration

### Production Environment Variables

Create a `.env.production` file or set environment variables on your server:

```env
#== APPLICATION
NODE_ENV=production
PORT=3000
ENABLE_DOCUMENTATION=false          # Disable Swagger in production
ENABLE_ORM_LOGS=false               # Disable query logging
API_VERSION=v1.0.0

#== DATABASE
DB_HOST=your-production-db-host.com
DB_PORT=5432
DB_USERNAME=production_user
DB_PASSWORD=super_secure_password_here
DB_DATABASE=production_db

#== JWT AUTHENTICATION
JWT_EXPIRATION_TIME=3600            # 1 hour
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END RSA PRIVATE KEY-----"
JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nYOUR_PUBLIC_KEY_HERE\n-----END PUBLIC KEY-----"

#== SECURITY
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
THROTTLER_TTL=1m
THROTTLER_LIMIT=10

#== AWS S3 (Optional)
AWS_S3_ACCESS_KEY_ID=your_access_key
AWS_S3_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_REGION=eu-central-1
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_API_VERSION=2010-12-01

#== OPTIONAL SERVICES
NATS_ENABLED=false
NATS_HOST=localhost
NATS_PORT=4222

REDIS_CACHE_ENABLED=false
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Generate Production JWT Keys

```bash
# Generate private key
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -pubout -out public.pem

# Convert to single-line format for .env
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' private.pem
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' public.pem
```

---

## Build for Production

### 1. Install Dependencies

```bash
yarn install --frozen-lockfile
```

### 2. Build Application

```bash
yarn build:prod
```

This creates optimized JavaScript files in the `dist/` directory.

### 3. Verify Build

```bash
# Check if dist folder exists
ls -la dist/

# Run type checking
yarn tsc --noEmit
```

---

## Deployment Options

### Docker Deployment (Recommended)

#### 1. Build Docker Image

```bash
docker build -t your-app-name:latest .
```

#### 2. Run Container

```bash
docker run -d \
  --name your-app \
  -p 3000:3000 \
  --env-file .env.production \
  your-app-name:latest
```

#### 3. Docker Compose (Full Stack)

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    image: your-app-name:latest
    container_name: nestjs-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_DATABASE=production_db
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    container_name: postgres-prod
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: production_db
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

Run with:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Traditional VPS/Server

#### 1. Upload Files

```bash
# Using SCP
scp -r dist/ package.json yarn.lock user@server:/var/www/your-app/

# Or using rsync
rsync -avz --exclude 'node_modules' --exclude '.env' \
  ./ user@server:/var/www/your-app/
```

#### 2. Install PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Navigate to app directory
cd /var/www/your-app

# Install dependencies
yarn install --production

# Start application
pm2 start dist/main.js --name your-app

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

#### 3. Configure Nginx Reverse Proxy

Create `/etc/nginx/sites-available/your-app`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Cloud Platforms

#### AWS EC2

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js, Docker, or your preferred runtime
3. Clone/upload your code
4. Follow VPS deployment steps above
5. Configure Security Groups (ports 80, 443, 3000)

#### Heroku

Create `Procfile`:

```
web: node dist/main.js
```

Deploy:

```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set NODE_ENV=production
heroku open
```

#### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build command: `yarn build:prod`
3. Configure run command: `yarn start:prod`
4. Add PostgreSQL database
5. Set environment variables

---

## Database Migration in Production

### Option 1: Auto-run on Startup

Already configured in `ormconfig.ts`:

```typescript
migrationsRun: true,  // Runs migrations automatically
```

### Option 2: Manual Migration

```bash
# SSH into server
ssh user@your-server.com

# Navigate to app directory
cd /var/www/your-app

# Run migrations
yarn migration:run

# Or using TypeORM CLI
yarn typeorm migration:run -d dist/ormconfig.js
```

### Option 3: CI/CD Pipeline

Add migration step to your deployment script:

```bash
#!/bin/bash
yarn install
yarn build:prod
yarn migration:run
pm2 restart your-app
```

---

## Monitoring & Health Checks

### Health Endpoints

Your app includes built-in health checks:

- **Basic Health**: `GET /health`
- **Detailed Health**: Includes database connection status

### Setup Monitoring

#### 1. Application Performance Monitoring (APM)

Install New Relic:

```bash
yarn add newrelic
```

Create `newrelic.js`:

```javascript
exports.config = {
  app_name: ['Your App Name'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
};
```

#### 2. Logging

Use structured logging:

```bash
yarn add winston
```

#### 3. Uptime Monitoring

- **UptimeRobot**: Free monitoring every 5 minutes
- **Pingdom**: Advanced monitoring
- **StatusCake**: Real-time alerts

---

## Security Checklist

### Before Going Live

- [ ] Change all default passwords
- [ ] Generate new JWT keys (don't use sample keys!)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Disable Swagger documentation (`ENABLE_DOCUMENTATION=false`)
- [ ] Disable ORM logs (`ENABLE_ORM_LOGS=false`)
- [ ] Set strong database passwords
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Review environment variables (no secrets in code!)
- [ ] Update all dependencies
- [ ] Configure backup strategy
- [ ] Test disaster recovery

### SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs your-app

# Or Docker logs
docker logs your-app

# Verify environment variables
printenv | grep YOUR_APP
```

### Database Connection Issues

```bash
# Test connection
psql -h DB_HOST -U DB_USERNAME -d DB_DATABASE

# Check if database exists
psql -h localhost -U postgres -c "\l"
```

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Memory Issues

```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" yarn start:prod

# Or in PM2
pm2 start dist/main.js --name your-app --max-memory=4G
```

### High CPU Usage

1. Check logs for errors
2. Monitor database queries
3. Review recent deployments
4. Scale horizontally (add more instances)

---

## Rollback Strategy

### Quick Rollback with PM2

```bash
# List previous versions
pm2 list

# Rollback to previous version
pm2 reload your-app --update-env
```

### Database Rollback

```bash
# Revert last migration
yarn migration:revert

# Or restore from backup
pg_restore -U postgres -d production_db backup.dump
```

---

## Post-Deployment Verification

After deployment, verify:

- [ ] Application responds on expected port
- [ ] Health check endpoint returns 200
- [ ] Authentication works
- [ ] Database queries execute successfully
- [ ] Error handling works correctly
- [ ] Logs are being written
- [ ] SSL certificate is valid
- [ ] CORS is configured correctly
- [ ] Rate limiting is active

---

## Maintenance Mode

### Enable Maintenance Mode

```bash
# Create maintenance page
echo "Maintenance in progress" > public/maintenance.html

# Configure Nginx to show maintenance page
```

### Backup Database

```bash
# Full backup
pg_dump -U postgres production_db > backup_$(date +%Y%m%d).sql

# Compress
gzip backup_*.sql

# Upload to S3 (optional)
aws s3 cp backup.sql.gz s3://your-backup-bucket/
```

---

## Support & Resources

- **NestJS Docs**: https://docs.nestjs.com
- **TypeORM Docs**: https://typeorm.io
- **PM2 Docs**: https://pm2.keymetrics.io
- **Docker Docs**: https://docs.docker.com

---

**Good luck with your deployment! 🚀**
