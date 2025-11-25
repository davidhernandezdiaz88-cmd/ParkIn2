# ⚡ ParkIn - Inicio Rápido (5 minutos)

## 🎯 Objetivo
Verificar que toda la aplicación funciona correctamente en tu máquina.

---

## ✅ Paso 1: Verificar Requisitos

```powershell
# Debe mostrar versión de Node.js (v18+)
node --version

# Debe mostrar versión de npm
npm --version
```

Si no tienes Node.js, descárgalo: https://nodejs.org/

---

## 🚀 Paso 2: Iniciar Todo Automáticamente

```powershell
cd "c:\Users\DAVID HERNANDEZ\Documents\vs code\ParkIn"
.\start-dev.ps1
```

**Espera 5-10 segundos** hasta ver ambos mensajes:
```
✅ Backend running on http://localhost:4000
✅ Frontend running on http://localhost:5173
```

---

## 🌐 Paso 3: Abre el Navegador

```
http://localhost:5173
```

Deberías ver la **pantalla de login** con 2 campos.

---

## 🔐 Paso 4: Hacer Login

Usa estas credenciales:

| Campo | Valor |
|-------|-------|
| Email | `user@parkin.local` |
| Password | `user123` |

Haz clic en **"Iniciar Sesión"**

---

## ✨ Paso 5: Explorar la Aplicación

### Dashboard (Pantalla principal)
- Verás: **Total de parkings**, **Mis reservaciones**, **Mi rol (usuario)**
- 3 botones de acción rápida

### Parqueaderos (Menú)
- Verás: **3 tarjetas de parqueaderos** con nombre, ubicación
- Cada una tiene descripción y botón "Ver detalles"

### Detalles de Parqueadero
- Verás: **10 spots** en forma de grid
  - 🟢 Verde = Disponible
  - 🟡 Amarillo = Reservado
  - 🔴 Rojo = Ocupado
- Haz clic en un spot verde para **HACER RESERVACIÓN**

### Hacer Reservación
- Aparecerá un modal/formulario
- Selecciona fecha inicio y fin
- Haz clic en **"Reservar"**
- ¡Listo! Verás un mensaje de éxito

### Mis Reservaciones (Menú)
- Verás: **Timeline con tus reservaciones**
- Información de cada una: Parking, Spot, Fechas

### Cerrar Sesión
- Haz clic en tu **email arriba a la derecha**
- Selecciona **"Cerrar Sesión"**
- Volverás al login

---

## 📋 Checklist de Verificación

```
✅ Node.js está instalado
✅ Script start-dev.ps1 ejecutó sin errores
✅ Backend muestra "Listening on port 4000"
✅ Frontend muestra "Local: http://localhost:5173"
✅ Puedo abrir http://localhost:5173
✅ Veo la pantalla de login
✅ Login funciona con las credenciales
✅ Veo el dashboard con estadísticas
✅ Veo 3 parqueaderos
✅ Hago click en un parqueadero y veo 10 spots
✅ Puedo hacer una reservación
✅ Puedo ver mis reservaciones
✅ Puedo hacer logout
```

---

## 🎉 ¡Éxito!

Si llegaste aquí, **la aplicación está funcionando correctamente** ✅

---

## 🆘 Problemas?

### Error: "Port 4000 already in use"
```powershell
# Cierra todos los procesos Node
taskkill /F /IM node.exe

# Reinicia
.\start-dev.ps1
```

### Error: "module not found"
```powershell
# Limpia e reinstala
cd backend
rm node_modules -Recurse
npm install
npm run dev:mem
```

### Frontend no se carga
- Espera 5 segundos después de iniciar
- Abre las herramientas de desarrollador (F12)
- Verifica que no hay errores en la consola
- Recarga la página (Ctrl+R)

### No puedo hacer login
- Verifica que el backend está corriendo
- En terminal backend debe aparecer "Listening on port 4000"
- Abre en nueva pestaña: `http://localhost:4000/api/parkings` y debe responder

---

## 📖 Guías Completas

Para pruebas más detalladas:
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - 7 opciones de prueba
- **[test-api.ps1](./test-api.ps1)** - Menú interactivo de API
- **[README.md](./README.md)** - Documentación completa

---

## 🚀 Próximos Pasos

Una vez que todo funcione:

1. **Explorar el código:**
   - Backend: `backend/src/`
   - Frontend: `frontend/src/`

2. **Realizar más pruebas:**
   - Ejecutar `.\test-api.ps1` para pruebas de API
   - Probar como admin: `admin@parkin.local / admin123`

3. **Desplegar a producción:**
   - Ver [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Docker setup en [infra/README.md](./infra/README.md)

---

**¿Preguntas? Revisa:**
- `TESTING_GUIDE.md` para troubleshooting detallado
- `README.md` para documentación técnica
- `backend/README.md` para API docs
- `frontend/README.md` para UI components

¡Disfruta usando ParkIn! 🎉
