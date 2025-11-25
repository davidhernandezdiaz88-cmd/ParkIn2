# Guía de Configuración para Producción

Esta guía te ayuda a desplegar **ParkIn2** en producción con:
- **Base de datos**: MongoDB (Atlas)
- **Frontend**: Netlify
- **Backend**: Render

---

## 📋 Pre-requisitos

1. Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Cuenta en [Render](https://render.com/)
3. Cuenta en [Netlify](https://www.netlify.com/)
4. Git configurado en tu máquina

---

## 1️⃣ Configurar MongoDB Atlas

### Paso 1: Crear un cluster
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Inicia sesión o crea una cuenta
3. Crea un nuevo proyecto llamado "ParkIn2"
4. Haz clic en "Build a Cluster" → M0 (Free tier)
5. Selecciona la región más cercana a ti
6. Completa la creación del cluster

### Paso 2: Configurar credenciales
1. Ve a "Database Access" → "Add a Database User"
2. Crea un usuario:
   - **Username**: `parkin_admin`
   - **Password**: Genera una contraseña segura y guárdala
   - Asigna el rol "Atlas Admin"

### Paso 3: Configurar acceso de red
1. Ve a "Network Access"
2. Haz clic en "Add IP Address"
3. Selecciona "Allow access from anywhere" (0.0.0.0/0) para desarrollo/presentación

### Paso 4: Obtener la conexión
1. Ve a "Clusters" → Haz clic en tu cluster
2. Haz clic en "Connect"
3. Selecciona "Drivers"
4. Copia la cadena de conexión:
   ```
   mongodb+srv://parkin_admin:<password>@cluster0.xxxxx.mongodb.net/parkin?retryWrites=true&w=majority
   ```
5. Reemplaza `<password>` con tu contraseña

---

## 2️⃣ Desplegar Backend en Render

### Paso 1: Preparar el repositorio
1. Asegúrate de que el código está en GitHub
2. El backend debe estar en la rama `main`

### Paso 2: Crear servicio en Render
1. Ve a [Render](https://render.com/)
2. Inicia sesión con tu cuenta GitHub
3. Haz clic en "New +" → "Web Service"
4. Conecta tu repositorio GitHub "ParkIn2"
5. Configura el servicio:

   | Campo | Valor |
   |-------|-------|
   | **Name** | `parkin-backend` |
   | **Environment** | `Node` |
   | **Region** | Selecciona la más cercana |
   | **Build Command** | `cd backend && npm install` |
   | **Start Command** | `cd backend && npm start` |
   | **Plan** | Free (o superior si necesitas) |

### Paso 3: Configurar variables de entorno
En el formulario de Render, agrega estas variables bajo "Environment":

```
MONGODB_URI=mongodb+srv://parkin_admin:<tu_password>@cluster0.xxxxx.mongodb.net/parkin?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_jwt_muy_seguro_aqui_cambiar_en_produccion
NODE_ENV=production
CORS_ORIGIN=https://parkin2.netlify.app
PORT=4000
```

### Paso 4: Desplegar
1. Haz clic en "Create Web Service"
2. Espera a que se complete el deployment
3. Copia la URL del servicio (ej: `https://parkin-backend-xxx.render.com`)

---

## 3️⃣ Desplegar Frontend en Netlify

### Paso 1: Preparar variables de entorno
Crea un archivo `.env.production` en la carpeta `frontend/`:

```env
VITE_API_BASE=https://parkin-backend-xxx.render.com/api
```

Reemplaza con tu URL de Render del paso anterior.

### Paso 2: Conectar a Netlify
1. Ve a [Netlify](https://www.netlify.com/)
2. Inicia sesión o crea una cuenta
3. Haz clic en "Add new site" → "Import an existing project"
4. Selecciona GitHub y autoriza
5. Selecciona el repositorio "ParkIn2"
6. Configura el deployment:

   | Campo | Valor |
   |-------|-------|
   | **Base directory** | `frontend` |
   | **Build command** | `npm run build` |
   | **Publish directory** | `dist` |

### Paso 3: Agregar variables de entorno
1. En el dashboard de Netlify, ve a "Build & deploy" → "Environment"
2. Haz clic en "Edit variables"
3. Agrega:
   ```
   VITE_API_BASE=https://parkin-backend-xxx.render.com/api
   ```

### Paso 4: Desplegar
1. Haz clic en "Deploy site"
2. Espera a que se complete
3. Tu sitio estará disponible en una URL de Netlify (ej: `https://parkin2.netlify.app`)

---

## 4️⃣ Verificar la Conexión

### Prueba el Backend
```bash
curl https://parkin-backend-xxx.render.com/api/health
```

Deberías recibir: `{"ok":true}`

### Prueba el Frontend
1. Ve a `https://parkin2.netlify.app`
2. Intenta crear una cuenta o iniciar sesión
3. Verifica que los datos se guardan en MongoDB

---

## 5️⃣ Configuración de CORS

El backend ya está configurado con CORS. Si tienes problemas, asegúrate de que en `backend/src/index.js` esté:

```javascript
const cors = require('cors');
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

---

## 🔒 Consideraciones de Seguridad para Presentación

Para una presentación segura:

1. **Cambiar JWT_SECRET**: Genera uno fuerte
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Limitar acceso de MongoDB**: En MongoDB Atlas, añade solo las IPs necesarias

3. **HTTPS**: Tanto Render como Netlify lo incluyen por defecto

4. **Validación de entrada**: Asegúrate que los modelos validen correctamente

---

## 🚀 URLs Finales

Después de completar todo, tendrás:

- **Frontend**: `https://parkin2.netlify.app`
- **Backend API**: `https://parkin-backend-xxx.render.com`
- **Base de datos**: MongoDB Atlas cluster

---

## 📞 Solución de Problemas

### El frontend no conecta al backend
- Verifica que `VITE_API_BASE` es correcto en Netlify
- Comprueba que CORS está habilitado en el backend
- Abre la consola del navegador para ver errores

### Errores de base de datos
- Verifica que `MONGODB_URI` es correcto
- Asegúrate que tu IP está autorizada en MongoDB Atlas
- Comprueba las credenciales de usuario

### Render tarda mucho en desplegar
- Los deploys gratuitos pueden ser lentos
- Espera 5-10 minutos en el primer despliegue

---

Documento actualizado: Noviembre 25, 2025
