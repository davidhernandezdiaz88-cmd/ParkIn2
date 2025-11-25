# Docker & Deployment Guide

## Prerequisites

- Docker (v20+)
- Docker Compose (v2.0+)
- Git

## Quick Start with Docker Compose

### 1. Configure Environment

```bash
cd infra
cp .env.example .env
# Edit .env if needed (optional - defaults are fine for dev)
```

### 2. Build and Run

```bash
cd infra
docker-compose up -d
```

Espera a que los servicios estén saludables (30-60 segundos).

### 3. Seed Database (First Time Only)

```bash
# Ejecutar desde fuera del contenedor
curl -X POST http://localhost:4000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{}'
```

Alternativamente, desde PowerShell:
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/admin/seed" -Method POST
```

### 4. Access Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **MongoDB**: localhost:27017 (usuario: `admin`, contraseña: `admin123`)

## Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f mongodb

# Stop services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

## Environment Variables

Edita `infra/.env` para cambiar:

```
MONGO_USER=admin              # MongoDB admin username
MONGO_PASSWORD=admin123       # MongoDB admin password
MONGO_PORT=27017             # MongoDB port
BACKEND_PORT=4000            # Backend API port
FRONTEND_PORT=3000           # Frontend port
JWT_SECRET=your_secret       # JWT signing key (CHANGE IN PRODUCTION!)
NODE_ENV=production          # Node environment
```

## Production Deployment

### 1. Update Secrets

Antes de deployment, modifica `infra/.env` con valores seguros:

```env
MONGO_PASSWORD=strong_password_here_1234!
JWT_SECRET=very_long_random_jwt_secret_key_here
```

### 2. Configure External MongoDB (Optional)

Si usas MongoDB Atlas en la nube:

```yaml
# En docker-compose.yml, comenta la sección 'mongodb:' y ajusta:
environment:
  MONGODB_URI: mongodb+srv://user:pass@cluster.mongodb.net/parkin?retryWrites=true&w=majority
```

### 3. Deploy

**Option A: VPS (DigitalOcean, Linode, AWS EC2)**

```bash
# SSH into your server
ssh user@your_server_ip

# Clone repo
git clone your_repo_url
cd ParkIn/infra

# Start with production compose
docker-compose -f docker-compose.yml up -d

# Setup reverse proxy (nginx)
# Configurar SSL con Let's Encrypt (certbot)
```

**Option B: PaaS (Render, Railway, Fly.io)**

Estos servicios tienen tooling integrado para Docker Compose. Sigue su documentación.

**Option C: Kubernetes (EKS, AKS, GKE)**

Convierte los servicios a manifiestos YAML y despliega usando `kubectl`.

## Monitoring

### Health Checks

Cada servicio tiene healthchecks:

```bash
docker-compose ps
```

Debería ver `healthy` en la columna `STATUS`.

### Logs

```bash
# Todos los logs
docker-compose logs --tail=100

# Seguimiento en tiempo real
docker-compose logs -f

# Solo errores
docker-compose logs | grep -i error
```

## Troubleshooting

### "Port already in use"

```bash
# Cambiar puerto en .env
BACKEND_PORT=5000
FRONTEND_PORT=3001

# O liberar puerto existente
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :4000
kill -9 <PID>
```

### "MongoDB connection failed"

Espera 30 segundos y verifica:

```bash
docker-compose logs mongodb
docker-compose ps
```

### "Frontend shows blank page"

Limpia cache y reconstruye:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### "Container keeps restarting"

```bash
docker-compose logs backend
# Busca el error y ajusta `.env` o variables de entorno
```

## Backup & Restore

### Backup MongoDB

```bash
docker exec parkin-mongodb mongodump \
  --username admin \
  --password admin123 \
  --authenticationDatabase admin \
  --out /backup
```

### Restore MongoDB

```bash
docker exec parkin-mongodb mongorestore \
  --username admin \
  --password admin123 \
  --authenticationDatabase admin \
  /backup
```

## Security Checklist

- ✅ Cambiar `JWT_SECRET` a un valor fuerte
- ✅ Cambiar `MONGO_PASSWORD` a un valor fuerte
- ✅ Usar HTTPS en producción (SSL/TLS)
- ✅ Limitar acceso a puertos (firewall)
- ✅ Configurar backups automáticos
- ✅ Usar .env para secretos (nunca comitear)
- ✅ Auditar logs regularmente

## Next Steps

- Configurar CI/CD (GitHub Actions, GitLab CI)
- Añadir monitoreo (Prometheus, Grafana)
- Configurar alertas
- Documentar runbooks operacionales
