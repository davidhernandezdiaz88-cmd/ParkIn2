# ParkIn — Administrador de Parqueaderos Residenciales

Proyecto fullstack completo y profesional para administrar parqueaderos en unidades residenciales con autenticación de usuarios, gestión de espacios y reservas.

## 🚀 Inicio Rápido

### ⚡ Opción 1: Automatizado (Recomendado - 10 segundos)

**Solo requiere Node.js 18+**

```powershell
cd "c:\Users\DAVID HERNANDEZ\Documents\vs code\ParkIn"
.\start-dev.ps1
```

El script automáticamente:
- ✅ Verifica Node.js
- ✅ Instala dependencias si faltan
- ✅ Inicia backend (puerto 4000)
- ✅ Inicia frontend (puerto 5173)

Luego abre: **http://localhost:5173**

---

### 🔧 Opción 2: Manual (Más Control)

Abre **dos terminales** diferentes:

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev:mem
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Luego abre: **http://localhost:5173**

---

### 🐳 Opción 3: Docker (MongoDB Persistente)

Requiere Docker instalado.

```bash
cd infra
cp .env.example .env
docker-compose up -d
```

Accede a:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## 📋 Credenciales de Demo

```
Admin:
  Email: admin@parkin.local
  Password: admin123

Usuario:
  Email: user@parkin.local
  Password: user123
```

## 🧪 Guía de Prueba

### Opción A: Interfaz Gráfica (UI)

1. Abre http://localhost:5173
2. Login con: `user@parkin.local` / `user123`
3. Explora:
   - ✅ Dashboard (estadísticas)
   - ✅ Parqueaderos (lista de parkings)
   - ✅ Detalles de parqueadero (spots disponibles)
   - ✅ Hacer reservación
   - ✅ Ver mis reservaciones

**Ver guía completa:** [`TESTING_GUIDE.md`](./TESTING_GUIDE.md)

### Opción B: API Testing (PowerShell)

Script interactivo con menú:

```powershell
.\test-api.ps1
```

Permite:
- 📍 Listar parqueaderos
- 🌱 Crear datos de demostración
- 🔐 Hacer login (usuario/admin)
- 📦 Obtener detalles de parqueadero
- 💾 Crear reservación
- 📋 Ver mis reservaciones

### Opción C: Manual (curl/Invoke-WebRequest)

**Listar parqueaderos:**
```powershell
Invoke-WebRequest http://localhost:4000/api/parkings
```

**Crear datos de demostración:**
```powershell
Invoke-WebRequest http://localhost:4000/api/admin/seed -Method POST
```

**Login:**
```powershell
$body = @{ email="user@parkin.local"; password="user123" } | ConvertTo-Json
Invoke-WebRequest http://localhost:4000/api/auth/login -Method POST `
  -ContentType "application/json" -Body $body
```

## 📁 Estructura del Proyecto

```
ParkIn/
├── backend/                    # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── index.js           # Servidor principal
│   │   ├── dev.js             # Development launcher (MongoDB en memoria)
│   │   ├── seed.js            # Script de seed
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API endpoints
│   │   └── middleware/        # JWT auth middleware
│   ├── Dockerfile             # Production container
│   ├── package.json
│   └── README.md
│
├── frontend/                   # React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── context/           # Auth context
│   │   ├── services/          # API client
│   │   ├── styles/            # CSS global
│   │   ├── App.jsx            # Main app
│   │   └── main.jsx           # Entry point
│   ├── Dockerfile             # Production Nginx container
│   ├── nginx.conf             # Nginx config
│   ├── package.json
│   └── README.md
│
├── infra/                      # Docker Compose & Deployment
│   ├── docker-compose.yml      # Full stack orchestration
│   ├── .env.example            # Environment template
│   └── README.md               # Docker & deployment guide
│
├── QUICKSTART.md               # Guía rápida de inicio
├── start-dev.ps1              # Script de desarrollo (Windows)
└── README.md                  # Este archivo
```

## 🔧 Stack Técnico

| Componente | Tecnología |
|-----------|-----------|
| **Backend** | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |
| **Frontend** | React 18, Vite, React Router, Axios, Tailwind CSS, Lucide Icons |
| **Database** | MongoDB (local o Atlas) |
| **DevOps** | Docker, Docker Compose, Nginx |
| **Authentication** | JWT (JSON Web Tokens) + bcrypt |

## ✨ Características

✅ **Autenticación JWT** — Registro e inicio de sesión seguro
✅ **Gestión de Parkings** — CRUD de parqueaderos
✅ **Gestión de Espacios** — Crear y listar spots (autos/motos)
✅ **Sistema de Reservas** — Crear, ver y gestionar reservas
✅ **Dashboard** — Vista personalizada para usuarios
✅ **UI Responsiva** — Funciona en móvil, tablet y desktop
✅ **Diseño Moderno** — Gradientes, animaciones, iconos
✅ **API REST** — Endpoints bien documentados
✅ **Containerización** — Docker listo para producción

## 📊 Rutas de la API

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|------------|
| POST | `/api/auth/register` | ❌ | Registrar usuario |
| POST | `/api/auth/login` | ❌ | Iniciar sesión |
| GET | `/api/parkings` | ❌ | Listar parkings |
| GET | `/api/parkings/:id` | ❌ | Detalle parking + spots |
| POST | `/api/reservations` | ✅ | Crear reserva |
| GET | `/api/reservations/my` | ✅ | Mis reservas |
| POST | `/api/admin/seed` | ❌ | Seedear datos de ejemplo |

## 🎨 Páginas de la App

| Ruta | Acceso | Descripción |
|------|--------|------------|
| `/` | Público | Home page |
| `/login` | Público | Iniciar sesión |
| `/parkings` | Público | Listar todos los parkings |
| `/parkings/:id` | Público | Detalle y espacios |
| `/dashboard` | Privado | Panel de control |
| `/reservations` | Privado | Mis reservas |

## 📦 Scripts Disponibles

### Backend

```bash
npm run dev        # Dev server con hot-reload
npm run dev:mem    # Dev con MongoDB en memoria (sin Docker)
npm start          # Production server
npm run seed       # Seedear datos (requiere MongoDB local)
```

### Frontend

```bash
npm run dev        # Dev server (Vite) en :5173
npm run build      # Build para producción
npm run preview    # Preview del build
```

## 🐳 Docker & Production

Para ejecutar la app completa con Docker:

```bash
cd infra
cp .env.example .env
# Editar .env con valores seguros (contraseñas, JWT secret)
docker-compose up -d
```

Para más detalles sobre deployment, ver `infra/README.md`.

## 🚀 Deployment a Producción

### Plataformas Recomendadas

**Backend:**
- Heroku (https://www.heroku.com)
- Railway (https://railway.app)
- Render (https://render.com)
- AWS ECS/Fargate
- DigitalOcean App Platform

**Frontend:**
- Vercel (https://vercel.com)
- Netlify (https://netlify.com)
- GitHub Pages
- S3 + CloudFront (AWS)

**Database:**
- MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- AWS DocumentDB
- Azure Cosmos DB

### Pasos Rápidos (Render.com)

1. Crear cuenta en https://render.com
2. Conectar repositorio de GitHub
3. Crear servicio "Web Service" para backend
4. Crear servicio "Static Site" para frontend
5. Configurar variables de entorno
6. Deploy

Para detalles completos, ver `infra/README.md`.

## 📚 Documentación

- **Backend**: `backend/README.md`
- **Frontend**: `frontend/README.md`
- **Docker/Deployment**: `infra/README.md`
- **Quick Start**: `QUICKSTART.md`

## ⚙️ Configuración

### Variables de Entorno Backend

`backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/parkin
JWT_SECRET=tu_super_secret_key_aqui
PORT=4000
```

### Variables de Entorno Frontend

`frontend/.env`:
```env
VITE_API_BASE=http://localhost:4000/api
```

## 🧪 Testing (Próxima Fase)

- Unit tests con Jest
- Integration tests
- E2E tests con Cypress
- API tests con Postman

## 🔒 Seguridad

- ✅ Passwords hasheados con bcryptjs
- ✅ JWT para autenticación
- ✅ CORS habilitado
- ✅ Variables de entorno protegidas
- ✅ Rate limiting recomendado para producción

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

Asegúrate de que:
- MongoDB está corriendo localmente: `mongod`
- O usa `npm run dev:mem` para in-memory DB
- O usa Docker: `docker-compose up -d`

### "Port already in use"

```bash
# Cambiar .env o parar el proceso existente
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### "Frontend no carga después de login"

- Limpia cookies y caché del navegador
- Verifica que el backend está corriendo
- Recarga la página (F5)

## 📞 Soporte

Para errores o preguntas:
1. Revisa los logs: `docker-compose logs -f`
2. Consulta la documentación específica en cada carpeta
3. Abre un issue en GitHub

## 📝 Licencia

MIT

## 🎯 Próximos Pasos

- [ ] Añadir tests (Jest, Cypress)
- [ ] Implementar panel de admin UI
- [ ] Notificaciones por email
- [ ] Sistema de pagos (Stripe)
- [ ] App móvil (React Native)
- [ ] Análitica (Google Analytics)
- [ ] Logs centralizados (ELK Stack)

---

**¡Disfruta usando ParkIn!** 🚗✨