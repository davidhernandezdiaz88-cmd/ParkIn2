# GUÍA DE USO RÁPIDO

## 🎯 Objetivo
ParkIn es una aplicación fullstack para administrar parqueaderos residenciales con autenticación de usuarios, gestión de espacios y reservas.

## 📋 Requisitos
- **Node.js** (v14+)
- **npm** (v6+)
- **Navegador web moderno**

No necesitas instalar MongoDB localmente; usamos una instancia en memoria para desarrollo.

## 🚀 Inicio Rápido (2 pasos)

### Paso 1: Backend
Abre una terminal en la carpeta `backend/` y ejecuta:
```powershell
npm install
npm run dev:mem
```
Esperarás ver: ✓ MongoDB Memory Server started at...
            Server running on port 4000
            ✓ Connected to MongoDB

### Paso 2: Frontend
Abre otra terminal en la carpeta `frontend/` y ejecuta:
```powershell
npm install
npm run dev
```
Esperarás ver: VITE v4.5.14 ready
              ➜  Local: http://localhost:5173/

Luego abre `http://localhost:5173` en tu navegador.

## 🔐 Credenciales para Probar

Al abrir la app, la primera vez no hay datos. Necesitas "seedear" (crear datos de ejemplo).

### Opción A: Seedear desde API
Abre una TERCERA terminal y ejecuta:
```powershell
cd backend
Invoke-WebRequest -Uri "http://localhost:4000/api/admin/seed" -Method POST -ContentType "application/json" -Body "{}"
```

Luego recarga la página en el navegador.

Credenciales:
- **Admin**: admin@parkin.local / admin123
- **User**: user@parkin.local / user123

### Opción B: Crear Usuario Manualmente
Haz clic en Login y completa los campos para registrarte con un nuevo usuario.

## 📖 Rutas de la Aplicación

- `/` — Página de inicio
- `/login` — Iniciar sesión o registrarse
- `/dashboard` — Panel de control (requiere login)
- `/parkings` — Listar todos los parqueaderos
- `/parkings/:id` — Ver detalles y espacios disponibles
- `/reservations` — Ver mis reservas (requiere login)

## 🎨 Características

✅ Autenticación con JWT
✅ Listar parqueaderos y espacios
✅ Realizar reservas
✅ Ver mis reservas
✅ Interfaz responsiva (móvil, tablet, desktop)
✅ UI moderna con Tailwind CSS

## ❓ Troubleshooting

### "Failed to connect to localhost:5173"
- Asegúrate de que ejecutaste `npm run dev` en el frontend.
- Prueba `http://localhost:5173` en el navegador.

### "Cannot connect to backend"
- Asegúrate de que ejecutaste `npm run dev:mem` en el backend.
- Verifica que el puerto 4000 está libre: `netstat -ano | findstr :4000`

### "Datos no aparecen en la app"
- Ejecuta el seed desde la terminal (ver Opción A arriba).
- Recarga la página del navegador.

### "npm: command not found"
- Instala Node.js desde https://nodejs.org

## 🛠️ Parar los Servidores

Presiona `Ctrl+C` en cada terminal.

## 📚 Estructura del Proyecto

```
ParkIn/
├── backend/          # API Express + MongoDB
│   ├── src/
│   │   ├── index.js         # Servidor principal
│   │   ├── dev.js           # Launcher con MongoDB en memoria
│   │   ├── models/          # Esquemas Mongoose
│   │   ├── routes/          # Endpoints de API
│   │   ├── middleware/      # Auth middleware
│   │   └── seed.js          # Script de seedeo
│   ├── package.json
│   └── README.md
├── frontend/         # App React + Vite
│   ├── src/
│   │   ├── pages/           # Componentes de página
│   │   ├── components/      # Componentes reutilizables
│   │   ├── context/         # Contexto de autenticación
│   │   ├── services/        # Cliente API
│   │   └── styles/          # CSS global
│   ├── package.json
│   └── README.md
├── infra/            # Docker Compose (opcional)
├── start-dev.ps1     # Script para arrancar todo (experimental)
└── README.md         # Este archivo
```

## 🚢 Deployment

Consulta `backend/README.md` y `frontend/README.md` para instrucciones de producción.

---

¿Necesitas ayuda? Revisa los READMEs individuales en `backend/` y `frontend/`.
