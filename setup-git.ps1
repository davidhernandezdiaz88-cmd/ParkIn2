#!/usr/bin/env powershell
# ParkIn Git Setup Script - Configura Git y GitHub

# No parameters needed

$cyan = "Cyan"
$green = "Green"
$yellow = "Yellow"
$red = "Red"

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor $cyan
Write-Host "║           ParkIn Git Setup Script                         ║" -ForegroundColor $cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor $cyan

# Step 1: Verify Git
Write-Host "`n📦 Paso 1: Verificando Git..." -ForegroundColor $cyan
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor $green
}
catch {
    Write-Host "❌ Git no está instalado. Descárgalo de: https://git-scm.com/download/win" -ForegroundColor $red
    exit 1
}

# Step 2: Ask for GitHub user
if (-not $GitHubUser) {
    Write-Host "`n👤 Paso 2: Configuración de GitHub" -ForegroundColor $cyan
    $GitHubUser = Read-Host "   Ingresa tu nombre de usuario de GitHub"
}
Write-Host "   ✅ Usuario: $GitHubUser" -ForegroundColor $green

# Step 3: Ask for email
if (-not $GitEmail) {
    $GitEmail = Read-Host "   Ingresa tu email de Git"
}
Write-Host "   ✅ Email: $GitEmail" -ForegroundColor $green

# Step 4: Configure Git globally
Write-Host "`n⚙️  Paso 3: Configurando Git globalmente..." -ForegroundColor $cyan
try {
    git config --global user.name $GitHubUser
    git config --global user.email $GitEmail
    Write-Host "   ✅ Configuración global completada" -ForegroundColor $green
}
catch {
    Write-Host "   ⚠️  Advertencia: No se pudo configurar globalmente, usando local" -ForegroundColor $yellow
    git config user.name $GitHubUser
    git config user.email $GitEmail
}

# Step 5: Initialize Git Repository
Write-Host "`n🔧 Paso 4: Inicializando repositorio Git..." -ForegroundColor $cyan
if (Test-Path ".git") {
    Write-Host "   ℹ️  .git ya existe. Usando repositorio existente." -ForegroundColor $yellow
} else {
    try {
        git init
        Write-Host "   ✅ Repositorio Git inicializado" -ForegroundColor $green
    }
    catch {
        Write-Host "   ❌ Error al inicializar Git: $_" -ForegroundColor $red
        exit 1
    }
}

# Step 6: Create .gitignore if not exists
Write-Host "`n📝 Paso 5: Creando/Verificando .gitignore..." -ForegroundColor $cyan
if (Test-Path ".gitignore") {
    Write-Host "   ℹ️  .gitignore ya existe" -ForegroundColor $yellow
} else {
    Write-Host "   ⚠️  .gitignore no encontrado. Usa el archivo de este proyecto." -ForegroundColor $yellow
}

# Step 7: Add files to Git
Write-Host "`n📂 Paso 6: Agregando archivos a Git..." -ForegroundColor $cyan
try {
    git add .
    $status = git status --short
    $fileCount = ($status | Measure-Object -Line).Lines
    Write-Host "   ✅ $fileCount archivos agregados" -ForegroundColor $green
}
catch {
    Write-Host "   ❌ Error al agregar archivos: $_" -ForegroundColor $red
}

# Step 8: First commit
Write-Host "`n💾 Paso 7: Haciendo primer commit..." -ForegroundColor $cyan
try {
    $commitMessage = "Initial commit: ParkIn fullstack application`n`nBackend: Node.js + Express + MongoDB`nFrontend: React + Vite + Tailwind CSS`nInfrastructure: Docker + Docker Compose`nDocumentation: Complete guides and testing`n`nFeatures:`n- User authentication with JWT`n- Parking lot management`n- Spot reservations`n- Responsive design`n`nReady for development and deployment."
    git commit -m $commitMessage
    Write-Host "   ✅ Primer commit completado" -ForegroundColor $green
}
catch {
    Write-Host "   ⚠️  Advertencia: Error en commit: $_" -ForegroundColor $yellow
}

# Step 9: Create main branch
Write-Host "`n🌿 Paso 8: Configurando rama main..." -ForegroundColor $cyan
try {
    git branch -M main
    Write-Host "   ✅ Rama main configurada" -ForegroundColor $green
}
catch {
    Write-Host "   ⚠️  Advertencia: No se pudo configurar main branch" -ForegroundColor $yellow
}

# Step 10: Summary and next steps
Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor $cyan
Write-Host "║                  ✅ CONFIGURACIÓN LOCAL LISTA               ║" -ForegroundColor $cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor $cyan

Write-Host "`n📋 Información del Repositorio:" -ForegroundColor $cyan
Write-Host "   Usuario: $GitHubUser" -ForegroundColor $green
Write-Host "   Email:   $GitEmail" -ForegroundColor $green
Write-Host "   Rama:    main" -ForegroundColor $green
Write-Host "   Nombre:  $RepoName" -ForegroundColor $green

Write-Host "`n🌍 PRÓXIMOS PASOS - Crear Remoto en GitHub:" -ForegroundColor $yellow
Write-Host "   1. Abre: https://github.com/new" -ForegroundColor $cyan
Write-Host "   2. Nombre: $RepoName" -ForegroundColor $cyan
Write-Host "   3. Descripción: Fullstack app for managing parking lots" -ForegroundColor $cyan
Write-Host "   4. NO marques 'Initialize with README'" -ForegroundColor $cyan
Write-Host "   5. Click 'Create repository'" -ForegroundColor $cyan

Write-Host "`n📌 Después de crear el repositorio en GitHub, ejecuta:" -ForegroundColor $yellow
Write-Host "   git remote add origin https://github.com/$GitHubUser/$RepoName.git" -ForegroundColor $green
Write-Host "   git push -u origin main" -ForegroundColor $green

Write-Host "`n💡 Comandos Útiles:" -ForegroundColor $yellow
Write-Host "   git log --oneline -10          Ver últimos commits" -ForegroundColor $cyan
Write-Host "   git status                     Ver cambios" -ForegroundColor $cyan
Write-Host "   git checkout -b feature/name   Crear nueva rama" -ForegroundColor $cyan
Write-Host "   git add .                      Agregar cambios" -ForegroundColor $cyan
Write-Host "   git commit -m 'mensaje'        Hacer commit" -ForegroundColor $cyan
Write-Host "   git push origin main           Enviar a GitHub" -ForegroundColor $cyan

Write-Host "`n✅ ¡Listo para usar Git! 🚀`n" -ForegroundColor $green
