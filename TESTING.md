# 🎉 ParkIn - Prueba de Aplicación

## 📖 Documentación Disponible

He creado **4 guías completas** para que pruebes la aplicación:

| Archivo | Descripción | Tiempo | Para quién |
|---------|-------------|--------|-----------|
| **QUICK_START.md** | Inicio rápido paso a paso | 5 min | Principiantes |
| **TESTING_GUIDE.md** | Guía completa con 7 opciones | Variable | Desarrolladores |
| **TESTING_OPTIONS.md** | Comparativa de alternativas | 10 min | Indeciso |
| **test-api.ps1** | Script interactivo con menú | 30 seg | Script users |

---

## 🚀 Opción Recomendada: Automatizado

```powershell
.\start-dev.ps1
```

**Resultado en ~10 segundos:**
- ✅ Backend en http://localhost:4000
- ✅ Frontend en http://localhost:5173

Luego abre tu navegador: **http://localhost:5173**

---

## 🧪 Alternativas

### A. Script Interactivo (Menú)
```powershell
.\test-api.ps1
```
Interfaz con 8 opciones para probar API.

### B. Manual (Más control)
```powershell
# Terminal 1
cd backend; npm run dev:mem

# Terminal 2
cd frontend; npm run dev
```

### C. Docker (Producción)
```bash
cd infra
docker-compose up -d
```

---

## 👤 Credenciales

```
Usuario: user@parkin.local / user123
Admin:   admin@parkin.local / admin123
```

---

## ✅ Checklist de Prueba Rápida

1. [ ] Ejecuta: `.\start-dev.ps1`
2. [ ] Abre: http://localhost:5173
3. [ ] Login: user@parkin.local / user123
4. [ ] Hace click: "Parqueaderos"
5. [ ] Hace click: En uno de los parkings
6. [ ] Hace click: En un spot verde (disponible)
7. [ ] Selecciona: Fechas de reservación
8. [ ] Click: "Reservar"
9. [ ] Ver: "Mis Reservaciones" en menú
10. [ ] Success! 🎉

---

## 📚 Para Más Detalles

- **5 minutos**: Lee `QUICK_START.md`
- **15 minutos**: Lee `TESTING_GUIDE.md`
- **30 minutos**: Lee `TESTING_OPTIONS.md` + prueba todo
- **1 hora**: Explora el código en `backend/` y `frontend/`

---

## 🎯 Siguientes Pasos

Una vez que pruebes:

1. **Explorar código**: `backend/src/` y `frontend/src/`
2. **Desplegar**: Ver `DEPLOYMENT.md`
3. **Desarrollo**: Agregar features nuevas
4. **Testing**: Agregar Jest + Cypress

---

**¿Listo?** Ejecuta:
```powershell
.\start-dev.ps1
```

¡Disfruta ParkIn! 🚗
