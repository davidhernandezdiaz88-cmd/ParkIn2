# Frontend — ParkIn

React app con Vite, React Router y Tailwind CSS.

## Instalación

```powershell
npm install
```

## Scripts

- `npm run dev` — Dev server en `http://localhost:5173`
- `npm run build` — Build para producción
- `npm run preview` — Vista previa del build

## Estructura

```
src/
├── pages/          # Páginas (Login, Dashboard, Parkings, etc.)
├── components/     # Componentes reutilizables
├── context/        # Contexto de autenticación (AuthContext)
├── services/       # Servicio API (axios)
├── styles/         # CSS global
├── App.jsx         # App principal con rutas
└── main.jsx        # Entry point
```

## Características

- **Rutas protegidas** — Dashboard y mis reservas requieren auth.
- **Contexto de autenticación** — Login/logout con persistencia en localStorage.
- **API client** — Axios con interceptor para JWT.
- **Responsive design** — Tailwind CSS para móvil/tablet/desktop.

## Variables de Entorno

Crea `.env` en `frontend/`:

```
VITE_API_BASE=http://localhost:4000/api
```

(Por defecto usa esta URL si no la especificas.)

## Páginas

- `/` — Home (público)
- `/login` — Login (público)
- `/dashboard` — Dashboard (privado)
- `/parkings` — Lista de parkings (público)
- `/parkings/:id` — Detalle de parking con spots y reservas (público)
- `/reservations` — Mis reservas (privado)

## API Endpoints (Backend)

- `POST /api/auth/register` — Registrar
- `POST /api/auth/login` — Login
- `GET /api/parkings` — Listar parkings
- `GET /api/parkings/:id` — Detalle parking con spots
- `POST /api/reservations` — Crear reserva (requiere auth)
- `GET /api/reservations/my` — Mis reservas (requiere auth)
- `POST /api/admin/seed` — Seedear datos

## Desarrollo

Con backend corriendo en `http://localhost:4000`, ejecuta:

```powershell
npm run dev
```

El frontend se abrirá en `http://localhost:5173` con hot-reload automático.
