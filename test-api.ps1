#!/usr/bin/env powershell
# ParkIn API Testing Script
# Prueba todos los endpoints de forma interactiva

param(
    [string]$Backend = "http://localhost:4000",
    [string]$Action = "menu"
)

$ErrorActionPreference = "Continue"

# Colors
$green = "Green"
$cyan = "Cyan"
$yellow = "Yellow"
$red = "Red"

function Show-Menu {
    Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor $cyan
    Write-Host "║           ParkIn API Test Menu             ║" -ForegroundColor $cyan
    Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor $cyan
    Write-Host ""
    Write-Host "1. 📍 Listar todos los parqueaderos" -ForegroundColor $green
    Write-Host "2. 🌱 Crear datos de demostración (Seed)" -ForegroundColor $green
    Write-Host "3. 🔐 Login como usuario" -ForegroundColor $green
    Write-Host "4. 🔐 Login como admin" -ForegroundColor $green
    Write-Host "5. 📦 Obtener parqueadero específico (con spots)" -ForegroundColor $green
    Write-Host "6. 💾 Crear reservación" -ForegroundColor $green
    Write-Host "7. 📋 Obtener mis reservaciones" -ForegroundColor $green
    Write-Host "8. 🧹 Limpiar terminal" -ForegroundColor $yellow
    Write-Host "0. ❌ Salir" -ForegroundColor $red
    Write-Host ""
}

function Test-Backend {
    Write-Host "`n⏳ Verificando conexión al backend..." -ForegroundColor $yellow
    try {
        $response = Invoke-WebRequest -Uri "$Backend/api/parkings" -Method GET -ErrorAction Stop
        Write-Host "✅ Backend conectado correctamente en $Backend" -ForegroundColor $green
        return $true
    }
    catch {
        Write-Host "❌ No se puede conectar a $Backend" -ForegroundColor $red
        Write-Host "   Asegúrate de ejecutar: cd backend; npm run dev:mem" -ForegroundColor $yellow
        return $false
    }
}

function Get-Parkings {
    Write-Host "`n📍 Obteniendo parqueaderos..." -ForegroundColor $cyan
    try {
        $response = Invoke-WebRequest -Uri "$Backend/api/parkings" -Method GET
        $data = $response.Content | ConvertFrom-Json
        
        if ($data.Count -eq 0) {
            Write-Host "ℹ️  No hay parqueaderos. Ejecuta primero: Seed Data (opción 2)" -ForegroundColor $yellow
        } else {
            Write-Host "✅ Se encontraron $($data.Count) parqueadero(s):" -ForegroundColor $green
            $data | ForEach-Object {
                Write-Host "   ID: $($_.id)" -ForegroundColor $cyan
                Write-Host "   Nombre: $($_.name)" -ForegroundColor $cyan
                Write-Host "   Ubicación: $($_.location)" -ForegroundColor $cyan
                Write-Host "   ---" -ForegroundColor $cyan
            }
        }
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor $red
    }
}

function Create-SeedData {
    Write-Host "`n🌱 Creando datos de demostración..." -ForegroundColor $cyan
    try {
        $response = Invoke-WebRequest -Uri "$Backend/api/admin/seed" -Method POST
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Datos creados exitosamente:" -ForegroundColor $green
        Write-Host "   Parqueaderos: $($data.parkings)" -ForegroundColor $green
        Write-Host "   Spots: $($data.spots)" -ForegroundColor $green
        Write-Host "`n👤 Credenciales de prueba:" -ForegroundColor $cyan
        Write-Host "   Usuario: $($data.user.email) / $($data.user.password)" -ForegroundColor $yellow
        Write-Host "   Admin:   $($data.admin.email) / $($data.admin.password)" -ForegroundColor $yellow
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor $red
    }
}

function Login-User {
    param([string]$Email, [string]$Password)
    
    Write-Host "`n🔐 Intentando login..." -ForegroundColor $cyan
    try {
        $body = @{
            email = $Email
            password = $Password
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "$Backend/api/auth/login" -Method POST `
            -ContentType "application/json" -Body $body
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Login exitoso:" -ForegroundColor $green
        Write-Host "   Email: $($data.email)" -ForegroundColor $green
        Write-Host "   Rol: $($data.role)" -ForegroundColor $green
        Write-Host "   Token: $($data.token.Substring(0, 30))..." -ForegroundColor $yellow
        
        return $data.token
    }
    catch {
        Write-Host "❌ Login fallido: $($_.Exception.Message)" -ForegroundColor $red
        return $null
    }
}

function Get-ParkingDetail {
    param([string]$ParkingId)
    
    Write-Host "`n📦 Obteniendo detalles del parqueadero..." -ForegroundColor $cyan
    try {
        $response = Invoke-WebRequest -Uri "$Backend/api/parkings/$ParkingId" -Method GET
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Información del parqueadero:" -ForegroundColor $green
        Write-Host "   ID: $($data.id)" -ForegroundColor $cyan
        Write-Host "   Nombre: $($data.name)" -ForegroundColor $cyan
        Write-Host "   Spots: $($data.spots.Count)" -ForegroundColor $cyan
        
        Write-Host "`n   Estado de los spots:" -ForegroundColor $cyan
        $data.spots | ForEach-Object {
            $statusColor = switch($_.status) {
                "available" { "Green" }
                "reserved" { "Yellow" }
                "occupied" { "Red" }
                default { "White" }
            }
            Write-Host "     - Spot $($_.spotNumber): $($_.status)" -ForegroundColor $statusColor
        }
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor $red
    }
}

function Create-Reservation {
    param([string]$Token)
    
    Write-Host "`n💾 Crear nueva reservación" -ForegroundColor $cyan
    
    # Input
    $spotId = Read-Host "   ID del Spot"
    $startDate = Read-Host "   Fecha inicio (YYYY-MM-DD)"
    $endDate = Read-Host "   Fecha fin (YYYY-MM-DD)"
    
    Write-Host "   Enviando..." -ForegroundColor $yellow
    
    try {
        $body = @{
            spotId = $spotId
            startDate = $startDate
            endDate = $endDate
        } | ConvertTo-Json
        
        $headers = @{
            "Authorization" = "Bearer $Token"
            "Content-Type" = "application/json"
        }
        
        $response = Invoke-WebRequest -Uri "$Backend/api/reservations" -Method POST `
            -Headers $headers -Body $body
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Reservación creada exitosamente:" -ForegroundColor $green
        Write-Host "   ID: $($data.id)" -ForegroundColor $green
        Write-Host "   Spot: $($data.spotId)" -ForegroundColor $green
        Write-Host "   Inicio: $($data.startDate)" -ForegroundColor $green
        Write-Host "   Fin: $($data.endDate)" -ForegroundColor $green
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor $red
    }
}

function Get-MyReservations {
    param([string]$Token)
    
    Write-Host "`n📋 Obteniendo tus reservaciones..." -ForegroundColor $cyan
    try {
        $headers = @{
            "Authorization" = "Bearer $Token"
        }
        
        $response = Invoke-WebRequest -Uri "$Backend/api/reservations" -Method GET -Headers $headers
        $data = $response.Content | ConvertFrom-Json
        
        if ($data.Count -eq 0) {
            Write-Host "ℹ️  No tienes reservaciones aún" -ForegroundColor $yellow
        } else {
            Write-Host "✅ Encontradas $($data.Count) reservación(es):" -ForegroundColor $green
            $data | ForEach-Object {
                Write-Host "   Parking: $($_.parkingId) | Spot: $($_.spotId)" -ForegroundColor $cyan
                Write-Host "   Desde: $($_.startDate) | Hasta: $($_.endDate)" -ForegroundColor $cyan
                Write-Host "   ---" -ForegroundColor $cyan
            }
        }
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor $red
    }
}

# Main Loop
while ($true) {
    if (-not (Test-Backend)) {
        Read-Host "Presiona Enter para reintentar o Ctrl+C para salir"
        continue
    }
    
    Show-Menu
    $choice = Read-Host "Selecciona una opción"
    
    switch ($choice) {
        "1" { Get-Parkings }
        
        "2" { Create-SeedData }
        
        "3" {
            $token = Login-User "user@parkin.local" "user123"
            if ($token) {
                $script:UserToken = $token
            }
        }
        
        "4" {
            $token = Login-User "admin@parkin.local" "admin123"
            if ($token) {
                $script:AdminToken = $token
            }
        }
        
        "5" {
            Get-Parkings
            $parkingId = Read-Host "`nIngresa el ID del parqueadero"
            Get-ParkingDetail $parkingId
        }
        
        "6" {
            if (-not $script:UserToken) {
                Write-Host "⚠️  Debes hacer login primero (opción 3)" -ForegroundColor $yellow
            } else {
                Create-Reservation $script:UserToken
            }
        }
        
        "7" {
            if (-not $script:UserToken) {
                Write-Host "⚠️  Debes hacer login primero (opción 3)" -ForegroundColor $yellow
            } else {
                Get-MyReservations $script:UserToken
            }
        }
        
        "8" {
            Clear-Host
            Write-Host "✅ Terminal limpiada" -ForegroundColor $green
        }
        
        "0" {
            Write-Host "`n👋 ¡Hasta luego!" -ForegroundColor $green
            exit 0
        }
        
        default {
            Write-Host "❌ Opción inválida. Intenta de nuevo." -ForegroundColor $red
        }
    }
    
    Write-Host ""
    Read-Host "Presiona Enter para continuar"
}
