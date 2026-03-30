# 🚀 QUICK START SCRIPTS

## Windows PowerShell

### Complete Setup (First Time)

Copy and paste this entire block into PowerShell:

```powershell
# Navigate to project
cd c:\Users\Medam\Desktop\starter\nest-starter

# 1. Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Green
yarn install

# 2. Start Docker database
Write-Host "🐳 Starting Docker database..." -ForegroundColor Green
docker-compose up -d

# Wait for database to be ready
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Green
Start-Sleep -Seconds 5

# 3. Run database migrations
Write-Host "🗄️ Running database migrations..." -ForegroundColor Green
yarn migration:run

# 4. Start development server
Write-Host "🚀 Starting development server..." -ForegroundColor Green
Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Application will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📚 API Documentation at: http://localhost:3000/documentation" -ForegroundColor Cyan
Write-Host "💾 Database UI at: http://localhost:5050 (admin@admin.com / admin123)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start server
yarn start:dev
```

### Quick Start (After First Setup)

```powershell
cd c:\Users\Medam\Desktop\starter\nest-starter
docker-compose up -d
yarn start:dev
```

---

## Linux / macOS Bash

### Complete Setup (First Time)

```bash
#!/bin/bash

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}📦 Installing dependencies...${NC}"
yarn install

echo -e "${GREEN}🐳 Starting Docker database...${NC}"
docker-compose up -d

echo -e "${GREEN}⏳ Waiting for database to be ready...${NC}"
sleep 5

echo -e "${GREEN}🗄️ Running database migrations...${NC}"
yarn migration:run

echo -e "${GREEN}🚀 Starting development server...${NC}"
echo ""
echo -e "${CYAN}✅ Setup complete!${NC}"
echo ""
echo -e "${CYAN}📱 Application will be available at: http://localhost:3000${NC}"
echo -e "${CYAN}📚 API Documentation at: http://localhost:3000/documentation${NC}"
echo -e "${CYAN}💾 Database UI at: http://localhost:5050 (admin@admin.com / admin123)${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

yarn start:dev
```

Save as `setup.sh` and run: `chmod +x setup.sh && ./setup.sh`

### Quick Start (After First Setup)

```bash
#!/bin/bash
docker-compose up -d
yarn start:dev
```

---

## Common Commands Reference

### Development
```bash
yarn start:dev          # Start dev server
yarn nest:start:dev     # Alternative dev server
yarn nest:start:debug   # Start with debugger
```

### Database
```bash
docker-compose up -d           # Start database
docker-compose down            # Stop database
yarn migration:generate name   # Create migration
yarn migration:run             # Run migrations
yarn schema:drop               # Drop all tables
```

### Testing
```bash
yarn test          # Run tests
yarn test:e2e      # E2E tests
yarn lint          # Check code
yarn lint:fix      # Fix issues
```

### Production
```bash
yarn build:prod    # Build for production
yarn start:prod    # Run production build
```

---

## Troubleshooting

### Database Connection Error
```powershell
# Windows
docker-compose restart postgres

# Linux/macOS
docker-compose restart postgres
```

### Port Already in Use
```powershell
# Find process on port 3000 (Windows)
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change PORT in .env file
```

### Dependencies Issues
```bash
# Clean reinstall
rm -rf node_modules yarn.lock
yarn install
```

---

## Environment Variables

Edit `.env` file to customize:

```env
PORT=3000                    # Change if port is taken
DB_HOST=127.0.0.1            # Database host
DB_PORT=5434                 # Database port
DB_USERNAME=myuser           # Database username
DB_PASSWORD=mypassword       # Database password
DB_DATABASE=hellobrickdb     # Database name
```

---

## Next Steps After Setup

1. **Test Authentication**
   ```bash
   # Register
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","firstName":"Test"}'
   
   # Login
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **View API Documentation**
   - Open browser: http://localhost:3000/documentation

3. **Access Database UI**
   - Open browser: http://localhost:5050
   - Login: admin@admin.com / admin123

4. **Create Your First Module**
   ```bash
   yarn generate module feature_name
   yarn generate controller feature_name
   yarn generate service feature_name
   ```

5. **Read Documentation**
   - See `docs/` folder for detailed guides
   - Check `DEPLOYMENT.md` for production deployment

---

## Tips

- **Hot Reload**: Changes auto-reload in development
- **Debugging**: Use `yarn nest:start:debug` and attach VS Code debugger
- **Database Backup**: Regularly backup your PostgreSQL data
- **Environment Files**: Never commit `.env` to Git (it's in `.gitignore`)

---

**Happy Coding! 🎉**
