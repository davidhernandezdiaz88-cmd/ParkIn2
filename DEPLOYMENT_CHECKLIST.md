# 🎯 Checklist de Deployment para Presentación

## Pre-Deployment (Antes de desplegar)

### Preparativos Locales
- [ ] Clonar el repositorio localmente
- [ ] Instalar dependencias del backend: `cd backend && npm install`
- [ ] Instalar dependencias del frontend: `cd frontend && npm install`
- [ ] Probar localmente con `npm run dev` (backend) y `npm run dev` (frontend)
- [ ] Pushear cambios finales a GitHub en rama `main`

### Credenciales y Secretos
- [ ] Crear cuenta en MongoDB Atlas
- [ ] Crear cuenta en Render
- [ ] Crear cuenta en Netlify
- [ ] Generar JWT_SECRET seguro usando `backend/generate-jwt-secret.ps1`
- [ ] Guardar las credenciales en un lugar seguro

---

## 1️⃣ MongoDB Atlas Setup (15-20 min)

### Crear Cluster
- [ ] Login en https://www.mongodb.com/cloud/atlas
- [ ] Click "New Project" → Nombre: "ParkIn2"
- [ ] Click "Build a Database" 
- [ ] Seleccionar "M0 (Free)" plan
- [ ] Seleccionar región
- [ ] Click "Create Deployment"
- [ ] Esperar 2-3 minutos a que se cree el cluster

### Crear Usuario de Acceso
- [ ] Click en "Database Access" (lado izquierdo)
- [ ] Click "Add New Database User"
- [ ] Username: `parkin_admin`
- [ ] Password: Generar una segura (guardar)
- [ ] Role: "Atlas Admin"
- [ ] Click "Add User"

### Autorizar IPs
- [ ] Click en "Network Access" (lado izquierdo)
- [ ] Click "Add IP Address"
- [ ] Seleccionar "Allow access from anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

### Obtener Connection String
- [ ] Click en el cluster (Deployments → Clusters)
- [ ] Click "Connect"
- [ ] Click "Drivers"
- [ ] Copiar la cadena (ej: mongodb+srv://parkin_admin:password@...)
- [ ] Reemplazar `<password>` con tu contraseña
- [ ] **GUARDAR ESTA CADENA** - la necesitarás en Render

**Connection String Example:**
```
mongodb+srv://parkin_admin:YourPasswordHere123@cluster0-abc123.mongodb.net/parkin?retryWrites=true&w=majority
```

---

## 2️⃣ Desplegar Backend en Render (10-15 min)

### Crear Web Service
- [ ] Login en https://render.com (usa GitHub)
- [ ] Click "New +" → "Web Service"
- [ ] Conectar repositorio "ParkIn2"
- [ ] Configurar:
  - Name: `parkin-backend`
  - Environment: `Node`
  - Region: Seleccionar región
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Plan: Free

### Agregar Variables de Entorno
- [ ] En la página de creación del servicio, scroll hasta "Environment"
- [ ] Agregar estas variables:

| Key | Value | Type |
|-----|-------|------|
| `NODE_ENV` | `production` | Standard |
| `PORT` | `4000` | Standard |
| `MONGODB_URI` | `mongodb+srv://parkin_admin:password@...` | Standard |
| `JWT_SECRET` | (tu JWT generado) | Standard |
| `CORS_ORIGIN` | `https://parkin2.netlify.app` | Standard |

- [ ] Click "Create Web Service"
- [ ] Esperar 5-10 minutos el deployment
- [ ] Copiar URL del servicio (ej: `https://parkin-backend-xxxx.render.com`)
- [ ] Probar: `curl https://parkin-backend-xxxx.render.com/api/health`

**Deberías ver:** `{"ok":true}`

---

## 3️⃣ Desplegar Frontend en Netlify (10-15 min)

### Conectar Repositorio
- [ ] Login en https://netlify.com (usa GitHub)
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Autorizar GitHub
- [ ] Seleccionar repositorio "ParkIn2"

### Configurar Build
- [ ] **Base directory:** `frontend`
- [ ] **Build command:** `npm run build`
- [ ] **Publish directory:** `dist`
- [ ] Click "Show advanced" → "New variable"

### Agregar Variable de Entorno
- [ ] Key: `VITE_API_BASE`
- [ ] Value: `https://parkin-backend-xxxx.render.com/api` (usar URL de Render)
- [ ] Click "Deploy site"
- [ ] Esperar 3-5 minutos

### Verificar Deployment
- [ ] Ir a la URL que genera Netlify (ej: `https://parkin2.netlify.app`)
- [ ] Probar crear un usuario
- [ ] Probar login

---

## 4️⃣ Verificación Final (5 min)

### Checklists de Validación

**Backend:**
- [ ] Health check: `curl https://parkin-backend-xxx.render.com/api/health` → `{"ok":true}`
- [ ] Conecta a MongoDB (revisa logs en Render)
- [ ] CORS está habilitado

**Frontend:**
- [ ] Carga en `https://parkin2.netlify.app`
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Los inputs funcionan
- [ ] Puedes hacer requests al backend

**Base de datos:**
- [ ] Login en MongoDB Atlas
- [ ] Revisa que la base de datos `parkin` existe
- [ ] Las colecciones (collections) se crean cuando haces acciones

---

## 🚀 URLs Finales para la Presentación

Después de completar todo, tienes:

| Componente | URL |
|-----------|-----|
| **Frontend** | `https://parkin2.netlify.app` |
| **Backend API** | `https://parkin-backend-xxxx.render.com/api` |
| **MongoDB Atlas** | https://www.mongodb.com/cloud/atlas |

---

## 🆘 Solución Rápida de Problemas

### "El frontend no puede conectarse al backend"
1. Verifica que `VITE_API_BASE` en Netlify es correcto
2. Abre DevTools (F12) → Network → ¿Ves el error?
3. Revisa que CORS_ORIGIN en Render es `https://parkin2.netlify.app`

### "MongoDB no conecta"
1. Verifica la `MONGODB_URI` en Render
2. Revisa que el usuario y password son correctos
3. Revisa Network Access en MongoDB Atlas: ¿permite 0.0.0.0/0?

### "El build falla en Render"
1. Revisa los logs en Render ("Logs" en el dashboard)
2. Asegúrate que `package.json` tiene todas las dependencias
3. Intenta localmente: `cd backend && npm install && npm start`

### "El build falla en Netlify"
1. Revisa los logs en Netlify ("Deploys" → último build)
2. Verifica que "Base directory" es `frontend`
3. Revisa que `dist/` no está en `.gitignore`

---

## 📝 Notas Importantes

- **No compartir credenciales**: Los JWT_SECRET y MONGODB_URI son privados
- **Primeros deploys son lentos**: Especialmente Render (puede tomar 10 min)
- **Las URLs cambiarán**: Cada nuevo deployment puede cambiar la URL de Render
- **Logs son tu amigo**: Siempre revisa los logs si algo no funciona
- **Hacer cambios**: Simplemente haz push a GitHub y los cambios se despliegan automáticamente

---

**Última actualización:** Noviembre 25, 2025
**Tiempo estimado total:** 45-60 minutos
