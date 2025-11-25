# ⚡ Quick Start - Deploy en 1 Hora

## Si tienes prisa, sigue esto:

### ⏱️ Paso 1: MongoDB Atlas (10 min)
```
1. Ve a https://www.mongodb.com/cloud/atlas
2. Login → New Project → Build Database
3. Choose M0 (Free)
4. Database Access: Add user "parkin_admin" + password
5. Network Access: Add IP "0.0.0.0/0"
6. Cluster → Connect → Copy Connection String
```

**Resultado:** Tu `MONGODB_URI`

---

### ⏱️ Paso 2: Backend en Render (15 min)
```
1. https://render.com → New Web Service
2. Connect GitHub repo "ParkIn2"
3. Settings:
   - Name: parkin-backend
   - Root Dir: backend
   - Build: npm install
   - Start: npm start
   
4. Environment Variables (bajo la sección):
   NODE_ENV = production
   PORT = 4000
   MONGODB_URI = (MongoDB connection string)
   JWT_SECRET = (ejecuta: node generate-jwt-secret.ps1)
   CORS_ORIGIN = https://parkin2.netlify.app
   
5. Create → Wait 10 min
```

**Resultado:** Tu `BACKEND_URL` (ej: `https://parkin-backend-xxxx.render.com`)

---

### ⏱️ Paso 3: Frontend en Netlify (10 min)
```
1. https://www.netlify.com → Add new site
2. Import existing project → GitHub → ParkIn2
3. Settings:
   - Base: frontend
   - Build: npm run build
   - Publish: dist
   
4. Show advanced → New variable:
   VITE_API_BASE = https://parkin-backend-xxxx.render.com/api
   
5. Deploy → Wait 5 min
```

**Resultado:** Tu `FRONTEND_URL` (ej: `https://parkin2.netlify.app`)

---

### ⏱️ Paso 4: Test (5 min)
```bash
# Backend alive?
curl https://parkin-backend-xxxx.render.com/api/health
# Should return: {"ok":true}

# Frontend working?
Open: https://parkin2.netlify.app
# Should load the app
```

---

## 🎯 URLs Finales
| | URL |
|---|---|
| Frontend | https://parkin2.netlify.app |
| Backend | https://parkin-backend-xxxx.render.com/api |
| DB | MongoDB Atlas (privada) |

---

## 📋 Variables de Entorno Resumidas

### Backend (Render)
```
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://parkin_admin:PASSWORD@cluster0-xxxx.mongodb.net/parkin?retryWrites=true&w=majority
JWT_SECRET=AnyStrongRandomStringHere123456789
CORS_ORIGIN=https://parkin2.netlify.app
```

### Frontend (Netlify)
```
VITE_API_BASE=https://parkin-backend-xxxx.render.com/api
```

---

## 🆘 Si algo no funciona

1. **Error en logs de Render?**
   → Lee los logs, ahí dice qué pasó

2. **Frontend no conecta al backend?**
   → Verifica VITE_API_BASE en Netlify
   → Verifica CORS_ORIGIN en Render

3. **MongoDB no conecta?**
   → Verifica MONGODB_URI está correcta
   → Verifica IP 0.0.0.0/0 en MongoDB Atlas
   → Verifica usuario y password

4. **¿Necesita ayuda detallada?**
   → Lee `PRODUCTION_SETUP.md`

---

**Tiempo total: 45 minutos** ✓
