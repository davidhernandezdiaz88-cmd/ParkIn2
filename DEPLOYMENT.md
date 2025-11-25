# 🚀 Deployment Guide - ParkIn

Elige tu plataforma preferida y sigue los pasos.

## ⚡ Opción Más Rápida: Render.com (Gratis + $7/mes)

### Paso 1: Preparar Repositorio

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Paso 2: Deploy Backend en Render

1. Ir a https://render.com
2. Conectar cuenta de GitHub
3. Click "New +" → "Web Service"
4. Seleccionar repositorio `ParkIn`
5. Configurar:
   - **Name**: `parkin-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend/`
6. Añadir variables de entorno (Environment):
   ```
   NODE_ENV = production
   MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/parkin?retryWrites=true&w=majority
   JWT_SECRET = <generar uuid fuerte>
   ```
7. Click "Create Web Service"

### Paso 3: Deploy MongoDB en Atlas (Gratis)

1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta / iniciar sesión
3. Crear cluster (Tier: Free)
4. Obtener connection string: `mongodb+srv://...`
5. Copiar en `MONGODB_URI` de Render

### Paso 4: Deploy Frontend en Vercel

1. Ir a https://vercel.com
2. Conectar GitHub
3. Click "Import Project"
4. Seleccionar repositorio `ParkIn`
5. Configurar:
   - **Root Directory**: `frontend/`
   - **Framework**: `Vite`
   - **Build Command**: `npm run build`
6. Añadir variable de entorno:
   ```
   VITE_API_BASE = https://parkin-backend.render.com/api
   ```
   (Reemplaza con tu URL de Render)
7. Click "Deploy"

**¡Listo!** Tu app está en vivo. 🎉

---

## 💻 Opción Local: Usar Docker

```bash
cd infra
cp .env.example .env

# Editar .env con valores seguros
# MONGO_PASSWORD, JWT_SECRET, etc.

docker-compose up -d
```

Accede a:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

---

## 🖥️ Opción VPS: DigitalOcean

### 1. Crear Droplet

- Elegir Ubuntu 22.04
- Tamaño mínimo: $6/mes
- Región cercana

### 2. SSH al Servidor

```bash
ssh root@your_droplet_ip
```

### 3. Instalar Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
apt-get install docker-compose -y
```

### 4. Clonar Repo

```bash
git clone https://github.com/your-username/ParkIn.git
cd ParkIn/infra
cp .env.example .env
```

### 5. Editar .env

```bash
nano .env
# Cambiar MONGO_PASSWORD y JWT_SECRET
# Ctrl+X, Y, Enter para guardar
```

### 6. Iniciar Stack

```bash
docker-compose up -d
```

### 7. Setup SSL (Let's Encrypt)

```bash
apt-get install certbot python3-certbot-nginx -y
certbot certonly --standalone -d your_domain.com
```

### 8. Configurar Nginx Reverse Proxy

```bash
apt-get install nginx -y
nano /etc/nginx/sites-available/default
```

Añadir:
```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:4000;
    }
}
```

```bash
nginx -t
systemctl restart nginx
```

**¡Listo!** Accede a `https://your_domain.com`

---

## 📱 Plataformas Alternativas

| Plataforma | Costo | Tiempo Setup | Notas |
|-----------|-------|------------|-------|
| Render | $7+/mes | 10 min | ⭐ Recomendado |
| Vercel (Frontend) | Gratis | 5 min | Solo frontend |
| Heroku | $7+/mes | 10 min | Tier gratuito descontinuado |
| AWS | Variable | 20 min | Más complejo |
| Railway.app | $5+/mes | 10 min | Buena alternativa |
| Fly.io | $5+/mes | 15 min | Buena para Docker |

---

## 🔒 Checklist de Seguridad

- ✅ Cambiar todos los passwords en `.env`
- ✅ Usar HTTPS (SSL/TLS)
- ✅ Configurar firewall
- ✅ Habilitar backups automáticos
- ✅ Monitoreo y alertas
- ✅ Logs centralizados
- ✅ Rate limiting en API
- ✅ CORS configurado

---

## 📊 Monitoreo

### Logs en Render

```bash
# En dashboard de Render
Logs → Automáticos
```

### Logs Locales (Docker)

```bash
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Health Check API

```bash
curl https://your_domain.com/api/health
```

---

## 🆘 Troubleshooting

### App lenta
- Aumentar recursos en Render
- Optimizar queries MongoDB
- Activar caching

### Errores de conexión
- Verificar MONGODB_URI
- Revisar firewall
- Comprobar status de servicios

### 500 Error en API
```bash
docker-compose logs backend | tail -50
```

---

## 💾 Backups

### MongoDB Atlas (Automático)
- Activado por defecto
- Backups cada 6 horas

### Manual

```bash
docker exec parkin-mongodb mongodump \
  -u admin -p $MONGO_PASSWORD \
  --authenticationDatabase admin \
  --out /backup
```

---

## 📈 Métricas & Analytics

- Google Analytics en frontend
- NewRelic para monitoring
- Sentry para error tracking

---

¿Necesitas ayuda? Consulta la documentación en `infra/README.md`
