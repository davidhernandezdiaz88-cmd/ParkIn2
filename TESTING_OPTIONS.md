# 🧪 Resumen de Opciones de Prueba

## Comparativa de Opciones

| Opción | Descripción | Complejidad | Tiempo | Comando |
|--------|-------------|------------|--------|---------|
| 🟢 **A: Automatizado** | Todo automático, solo ejecutar script | ⭐ Muy Fácil | 10s | `.\start-dev.ps1` |
| 🟡 **B: Interactivo** | Menú PowerShell para probar API | ⭐⭐ Fácil | 30s | `.\test-api.ps1` |
| 🔵 **C: Manual** | Dos terminales, más control | ⭐⭐⭐ Moderada | 20s | 2 `npm run` |
| 🟣 **D: Docker** | Producción, MongoDB persistente | ⭐⭐⭐ Moderada | 60s | `docker-compose up` |
| ⚫ **E: Línea de Comandos** | Pruebas manuales con curl | ⭐⭐⭐ Moderada | Variable | `Invoke-WebRequest` |

---

## 🟢 Opción A: Automatizado (RECOMENDADO)

### Ventajas
- ✅ Una sola línea de comando
- ✅ Verifica dependencias automáticamente
- ✅ Inicia backend + frontend
- ✅ Perfecto para principiantes

### Desventajas
- ❌ Menos control
- ❌ Logs mixtos en una ventana

### Instrucciones
```powershell
cd "c:\Users\DAVID HERNANDEZ\Documents\vs code\ParkIn"
.\start-dev.ps1
```

### Resultado esperado
```
✅ Backend running on http://localhost:4000
✅ Frontend running on http://localhost:5173
```

Luego abre: **http://localhost:5173**

---

## 🟡 Opción B: Interactivo (PRUEBAS DE API)

### Ventajas
- ✅ Menú visual con opciones
- ✅ Prueba todos los endpoints
- ✅ No necesita escribir comandos
- ✅ Colores para mejor legibilidad

### Desventajas
- ❌ Requiere que backend esté corriendo primero
- ❌ Solo para pruebas API, no UI

### Instrucciones
```powershell
# Primero inicia el backend
cd backend
npm run dev:mem

# En otra terminal
cd "c:\Users\DAVID HERNANDEZ\Documents\vs code\ParkIn"
.\test-api.ps1
```

### Menú disponible
```
1. 📍 Listar todos los parqueaderos
2. 🌱 Crear datos de demostración (Seed)
3. 🔐 Login como usuario
4. 🔐 Login como admin
5. 📦 Obtener parqueadero específico
6. 💾 Crear reservación
7. 📋 Obtener mis reservaciones
8. 🧹 Limpiar terminal
0. ❌ Salir
```

---

## 🔵 Opción C: Manual (Más Control)

### Ventajas
- ✅ Control total sobre cada proceso
- ✅ Logs separados y claros
- ✅ Puedes ver exactamente qué pasa
- ✅ Fácil de debuggear

### Desventajas
- ❌ Necesita dos terminales
- ❌ Un poco más de pasos

### Instrucciones

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev:mem
```

Espera a ver:
```
[dev] Listening on port 4000
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Espera a ver:
```
Local:   http://localhost:5173/
```

Luego abre: **http://localhost:5173**

---

## 🟣 Opción D: Docker (Producción)

### Ventajas
- ✅ Ambiente muy similar a producción
- ✅ MongoDB persistente
- ✅ Fácil de desplegar después
- ✅ Todos los servicios orquestados

### Desventajas
- ❌ Requiere Docker instalado
- ❌ Más lento que en-memoria
- ❌ Más recursos del sistema

### Instrucciones
```bash
cd infra
cp .env.example .env
docker-compose up -d
```

Espera 30 segundos:
```bash
docker-compose ps
```

Luego accede a:
- Frontend: **http://localhost:3000**
- Backend: **http://localhost:4000**

### Ver logs
```bash
docker-compose logs -f
```

### Detener
```bash
docker-compose down
```

---

## ⚫ Opción E: Línea de Comandos Manual

### Ventajas
- ✅ Máximo control
- ✅ Perfecta para scripting
- ✅ Debugging detallado

### Desventajas
- ❌ Más comandos que escribir
- ❌ Requiere entender REST API
- ❌ Sin interfaz gráfica

### Instrucciones

**1. Listar parqueaderos:**
```powershell
Invoke-WebRequest http://localhost:4000/api/parkings
```

**2. Crear datos de demostración:**
```powershell
Invoke-WebRequest http://localhost:4000/api/admin/seed -Method POST
```

**3. Login:**
```powershell
$body = @{
    email = "user@parkin.local"
    password = "user123"
} | ConvertTo-Json

$response = Invoke-WebRequest http://localhost:4000/api/auth/login `
  -Method POST -ContentType "application/json" -Body $body

$token = ($response.Content | ConvertFrom-Json).token
Write-Host $token
```

**4. Obtener parqueadero con spots:**
```powershell
# Primero necesitas el ID de un parking (de paso 2)
Invoke-WebRequest http://localhost:4000/api/parkings/[ID_AQUI]
```

**5. Crear reservación:**
```powershell
$body = @{
    spotId = "[SPOT_ID]"
    startDate = "2025-11-25"
    endDate = "2025-11-26"
} | ConvertTo-Json

$headers = @{ "Authorization" = "Bearer $token" }

Invoke-WebRequest http://localhost:4000/api/reservations `
  -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

---

## 📊 Cuándo usar cada opción

| Caso | Opción Recomendada |
|------|------------------|
| Quiero empezar ahora | 🟢 Automatizado |
| Quiero probar API | 🟡 Interactivo |
| Quiero entender qué pasa | 🔵 Manual |
| Quiero simular producción | 🟣 Docker |
| Quiero scripting/automatización | ⚫ Línea de comandos |
| Soy principiante | 🟢 Automatizado |
| Soy desarrollador experimentado | 🔵 Manual |
| Voy a desplegar pronto | 🟣 Docker |

---

## ✅ Checklist de Prueba Completa

Una vez que elijas tu opción:

**Backend:**
- [ ] Backend arranca sin errores
- [ ] API responde en http://localhost:4000/api/parkings
- [ ] Seed endpoint crea datos

**Frontend:**
- [ ] Frontend arranca sin errores
- [ ] Puedo acceder a http://localhost:5173
- [ ] Login funciona

**Funcionalidades:**
- [ ] Veo dashboard con estadísticas
- [ ] Veo lista de parqueaderos
- [ ] Veo spots cuando abro un parqueadero
- [ ] Puedo crear una reservación
- [ ] Puedo ver mis reservaciones
- [ ] Puedo hacer logout

---

## 🆘 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Port 4000 en uso | `taskkill /F /IM node.exe` |
| Port 5173 en uso | `taskkill /F /IM node.exe` |
| Module not found | `npm install` en backend y frontend |
| Backend no responde | Verifica "Listening on port 4000" |
| Frontend no carga | Espera 5 segundos, recarga (Ctrl+R) |
| Login no funciona | Ejecuta seed: POST /api/admin/seed |

---

## 📚 Documentación Completa

- **QUICK_START.md** - Guía visual rápida (5 min)
- **TESTING_GUIDE.md** - Guía completa con 7 opciones
- **README.md** - Documentación del proyecto
- **backend/README.md** - API docs
- **frontend/README.md** - UI docs
- **infra/README.md** - Docker docs

---

## 🎯 Mi Recomendación Personal

**Para la mayoría de usuarios:**
```powershell
.\start-dev.ps1
```

**Para probar API sin UI:**
```powershell
.\test-api.ps1
```

**Para máximo control y debugging:**
```powershell
# Terminal 1
cd backend; npm run dev:mem

# Terminal 2
cd frontend; npm run dev
```

---

¿Necesitas más detalles? Revisa los archivos específicos en documentación.
