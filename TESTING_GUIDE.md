# 🧪 Guía de Prueba - ParkIn

## Opción 1: Inicio Rápido (PowerShell Automatizado)

### Paso 1: Ejecutar el Script de Inicio
```powershell
cd 'c:\Users\DAVID HERNANDEZ\Documents\vs code\ParkIn'
.\start-dev.ps1
```

Este script:
- ✅ Verifica que Node.js está instalado
- ✅ Instala dependencias (si faltan)
- ✅ Inicia backend con mongodb-memory-server en puerto 4000
- ✅ Inicia frontend en puerto 5173

**Espera 3-5 segundos** para que el backend esté listo.

---

## Opción 2: Inicio Manual (Más Control)

### Terminal 1: Backend
```powershell
cd backend
npm run dev:mem
```

Deberías ver:
```
[nodemon] starting `node src/dev.js`
[dev] MongoDB memory server starting...
[dev] Database connected: mongodb://localhost:27017/parking
[dev] Listening on port 4000
```

### Terminal 2: Frontend
```powershell
cd frontend
npm run dev
```

Deberías ver:
```
  VITE v4.4.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🔍 Prueba 1: Verificar Backend API

### En una nueva terminal, ejecuta:

**Listar todos los parqueaderos (antes de seed):**
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/parkings" -Method GET | Select-Object -ExpandProperty Content
```

**Resultado esperado:** Array vacío `[]`

---

## 🌱 Prueba 2: Crear Datos de Demostración

**Ejecutar seed endpoint:**
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/admin/seed" -Method POST | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

**Resultado esperado:**
```
message   : Database seeded successfully
admin     : @{email=admin@parkin.local; password=admin123}
user      : @{email=user@parkin.local; password=user123}
parkings  : 3
spots     : 30
```

---

## 🔓 Prueba 3: Autenticación (Login)

**Como Usuario:**
```powershell
$body = @{
    email = "user@parkin.local"
    password = "user123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/auth/login" -Method POST -ContentType "application/json" -Body $body | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

**Resultado esperado:**
```
email : user@parkin.local
role  : user
token : eyJhbGc...
```

**Como Admin:**
```powershell
$body = @{
    email = "admin@parkin.local"
    password = "admin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/auth/login" -Method POST -ContentType "application/json" -Body $body | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

---

## 📍 Prueba 4: Obtener Parqueaderos con Spots

**Después de ejecutar seed, lista todos los parqueaderos:**
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/parkings" -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

**Resultado esperado:** 3 parqueaderos con nombre, descripción, ubicación

**Obtener un parqueadero específico (con spots):**
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/parkings/[ID_DEL_PARQUEADERO]" -Method GET | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

---

## 💾 Prueba 5: Crear Reservación

**Primero, obtén tu token:**
```powershell
$body = @{
    email = "user@parkin.local"
    password = "user123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:4000/api/auth/login" -Method POST -ContentType "application/json" -Body $body
$token = ($response.Content | ConvertFrom-Json).token
Write-Host "Token: $token"
```

**Crear reservación:**
```powershell
$body = @{
    spotId = "[ID_DEL_SPOT]"
    startDate = "2025-11-25"
    endDate = "2025-11-26"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Invoke-WebRequest -Uri "http://localhost:4000/api/reservations" -Method POST -Headers $headers -Body $body | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-List
```

---

## 🖥️ Prueba 6: Frontend - Interfaz Gráfica

### Abre tu navegador en: **http://localhost:5173**

### Paso 1: Login
- Email: `user@parkin.local`
- Password: `user123`
- Click "Iniciar Sesión"

### Paso 2: Dashboard
- Verás estadísticas: Total de parqueaderos, tus reservaciones, tu rol
- Links rápidos a funciones principales

### Paso 3: Explorar Parqueaderos
- Haz clic en "Parqueaderos" o en la tarjeta del dashboard
- Verás 3 parqueaderos con cards bonitas
- Haz clic en uno para ver los spots

### Paso 4: Hacer una Reservación
- En la vista de parqueadero detallado:
  - Spots verdes = Disponibles
  - Spots amarillos = Reservados
  - Spots rojos = Ocupados
- Haz clic en un spot verde
- Selecciona fecha inicio y fin
- Click "Reservar"

### Paso 5: Ver Tus Reservaciones
- Haz clic en "Mis Reservaciones"
- Verás timeline con todas tus reservaciones
- Información: Parqueadero, Spot, Fechas

### Paso 6: Logout
- Haz clic en tu email/avatar arriba a la derecha
- Selecciona "Cerrar Sesión"
- Volverás al login

---

## 🔐 Prueba 7: Funciones Admin

### Login como Admin
- Email: `admin@parkin.local`
- Password: `admin123`

### Cambios visuales esperados:
- Rol mostrado como "admin"
- (En futuros updates) Acceso a panel administrativo

---

## ⚡ Prueba Rápida (5 minutos)

Si solo quieres verificar que todo funciona:

```powershell
# Terminal 1
cd backend; npm run dev:mem

# Terminal 2 (espera 3s)
cd frontend; npm run dev

# Terminal 3 (espera 2s, después abre el navegador)
Invoke-WebRequest http://localhost:4000/api/parkings
Invoke-WebRequest http://localhost:4000/api/admin/seed -Method POST

# Luego en navegador: http://localhost:5173
# Login: user@parkin.local / user123
```

---

## 🐛 Troubleshooting

### Error: "Port 4000 already in use"
```powershell
# Detén todos los procesos Node
taskkill /F /IM node.exe

# Luego reinicia
cd backend; npm run dev:mem
```

### Error: "module not found"
```powershell
# Reinstala dependencias
cd backend
rm -r node_modules
npm install
npm run dev:mem
```

### Frontend no se conecta al backend
- Verifica que backend esté corriendo: http://localhost:4000/api/parkings debe responder
- Verifica que frontend tiene `.env.local` o `VITE_API_BASE=http://localhost:4000`

### "Cannot find seed data"
- El endpoint POST /api/admin/seed crea datos nuevos cada vez
- Ejecuta: `Invoke-WebRequest http://localhost:4000/api/admin/seed -Method POST`

---

## ✅ Checklist de Prueba Completa

- [ ] Backend arranca sin errores en puerto 4000
- [ ] Frontend arranca sin errores en puerto 5173
- [ ] Seed endpoint crea datos (3 parqueaderos, 30 spots)
- [ ] Login funciona con user@parkin.local/user123
- [ ] Dashboard muestra estadísticas correctas
- [ ] Puedo ver los 3 parqueaderos en lista
- [ ] Puedo ver spots cuando hago click en parqueadero
- [ ] Puedo crear una reservación
- [ ] Puedo ver mis reservaciones
- [ ] Puedo hacer logout
- [ ] Login como admin@parkin.local/admin123 funciona

---

## 📊 Estructura de Datos de Ejemplo

### Parqueaderos (después de seed)
```
1. Central Park
   - Ubicación: Downtown
   - 10 spots (verde/amarillo/rojo)

2. Mall Parking
   - Ubicación: Shopping Center
   - 10 spots

3. Residential Complex
   - Ubicación: Apt Building
   - 10 spots
```

---

## 🚀 Próximos Pasos

1. **Deployment** → Ver `DEPLOYMENT.md` para producción
2. **Tests** → Agregar Jest + Cypress
3. **Features** → Pagos, notificaciones, etc.

¡Disfruta probando ParkIn! 🎉
