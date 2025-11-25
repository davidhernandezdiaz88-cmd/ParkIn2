# 🔧 Guía de Configuración de Git para ParkIn

## ✅ Estado Actual

- ✅ Git 2.51.0 instalado
- ✅ Proyecto con estructura completa
- ✅ Toda la documentación lista
- ❌ Repositorios Git aún no inicializados

---

## 📋 Plan de Configuración

### Opción A: Monorepo Único (RECOMENDADO)

**Estructura:**
```
ParkIn/                           ← Repositorio principal
├── backend/                      ← Carpeta (no repo separado)
├── frontend/                     ← Carpeta (no repo separado)
├── infra/                        ← Carpeta (no repo separado)
└── .git/                         ← Un solo Git
```

**Ventajas:**
- ✅ Un solo repositorio para todo
- ✅ Cambios coordinados (atomic commits)
- ✅ Más simple de manejar
- ✅ Ideal para proyectos pequeños/medianos

**Desventajas:**
- ❌ Tamaño del repo más grande
- ❌ Requiere coordinación al trabajar en equipo

---

### Opción B: Monorepo con Submódulos

**Estructura:**
```
ParkIn/                           ← Repo principal
├── backend/                      ← Submódulo Git
├── frontend/                     ← Submódulo Git
└── infra/                        ← Submódulo Git
```

**Ventajas:**
- ✅ Repos separados (más modular)
- ✅ Cada equipo puede trabajar independientemente
- ✅ Versioning granular por componente

**Desventajas:**
- ❌ Más complejo de manejar
- ❌ Requiere conocimiento de submódulos

---

### Opción C: Repositorios Completamente Separados

**Estructura:**
```
ParkIn-monorepo/     ← Principal (orquestación)
ParkIn-backend/      ← Repo separado
ParkIn-frontend/     ← Repo separado
ParkIn-infra/        ← Repo separado
```

**Ventajas:**
- ✅ Máxima independencia
- ✅ Equipos completamente separados
- ✅ CI/CD granular

**Desventajas:**
- ❌ Más complejo de sincronizar
- ❌ Requiere coordinación de versiones

---

## 🚀 CONFIGURACIÓN RECOMENDADA (Opción A)

### Paso 1: Navegar al Proyecto

```powershell
cd "c:\Users\DAVID HERNANDEZ\Documents\vs code\ParkIn"
```

### Paso 2: Crear .gitignore Principal

Crea un archivo `.gitignore` en la raíz:

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.log

# Docker
.dockerignore

# Database
*.db
mongodb_data/

# OS temp
tmp/
temp/
```

### Paso 3: Inicializar Git

```powershell
git init
```

**Resultado esperado:**
```
Initialized empty Git repository in C:\Users\...\ParkIn\.git\
```

### Paso 4: Configurar Usuario (si no lo has hecho)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@example.com"
```

### Paso 5: Agregar Archivos

```powershell
git add .
```

### Paso 6: Ver Estado

```powershell
git status
```

**Resultado esperado:**
```
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   README.md
        new file:   backend/...
        new file:   frontend/...
        ...
```

### Paso 7: Primer Commit

```powershell
git commit -m "Initial commit: ParkIn fullstack application

- Backend: Node.js + Express + MongoDB
- Frontend: React + Vite + Tailwind CSS
- Infrastructure: Docker + Docker Compose
- Documentation: Complete guides and testing

Features:
- User authentication with JWT
- Parking lot management
- Spot reservations
- Responsive design

Ready for development and deployment."
```

### Paso 8: Crear Rama Main (Opcional pero Recomendado)

```powershell
git branch -M main
```

---

## 🌍 CREAR REPOSITORIO REMOTO EN GITHUB

### Paso 1: Crear Repositorio en GitHub

1. Abre: https://github.com/new
2. Nombre: `ParkIn`
3. Descripción: "Fullstack web app for managing parking lots in residential units"
4. Privacidad: Public o Private (tu elección)
5. NO marques "Initialize with README" (ya tenemos commits)
6. Click: "Create repository"

### Paso 2: Agregar Remote

```powershell
git remote add origin https://github.com/TU_USUARIO/ParkIn.git
```

Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub.

### Paso 3: Hacer Push

```powershell
git branch -M main
git push -u origin main
```

**Resultado esperado:**
```
Enumerating objects: 250, done.
Counting objects: 100% (250/250), done.
...
To https://github.com/TU_USUARIO/ParkIn.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🎯 FLUJO DE TRABAJO GIT

### Para Nuevo Feature

```powershell
# 1. Crear rama
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios
# ... edita archivos ...

# 3. Ver cambios
git status

# 4. Agregar cambios
git add .
# O archivos específicos:
git add backend/src/routes/nueva-ruta.js

# 5. Commit
git commit -m "Add new feature: description"

# 6. Push
git push origin feature/nueva-funcionalidad

# 7. En GitHub: Crear Pull Request
```

### Para Arreglar Bug

```powershell
git checkout -b fix/descripcion-bug
# ... hacer cambios ...
git add .
git commit -m "Fix: descripcion del bug"
git push origin fix/descripcion-bug
```

### Para Actualizar Rama

```powershell
git fetch origin
git pull origin main
```

---

## 📝 COMANDOS ÚTILES

### Ver Historial
```powershell
git log --oneline -10
```

### Ver Cambios no Cometidos
```powershell
git diff
```

### Ver Estado
```powershell
git status
```

### Deshacer Cambios
```powershell
git restore <archivo>
```

### Revertir Commit
```powershell
git revert <commit-id>
```

### Ver Ramas
```powershell
git branch -a
```

---

## 🔐 MEJORES PRÁCTICAS

### 1. Commits Frecuentes
- Pequeños commits temáticos
- Mensaje claro y descriptivo
- Una funcionalidad por commit

### 2. Mensajes de Commit

**Buen formato:**
```
[Type] Descripción corta (50 caracteres max)

Descripción más detallada si es necesaria.
- Punto 1
- Punto 2

Fixes #123
```

**Tipos comunes:**
- `feat:` Nueva funcionalidad
- `fix:` Arreglo de bug
- `docs:` Documentación
- `style:` Formato/estilo
- `refactor:` Reorganización de código
- `test:` Pruebas
- `chore:` Tareas administrativas

### 3. Ramas

**Nombres de rama:**
```
feature/nombre-funcionalidad
fix/descripcion-bug
docs/actualizacion-readme
chore/dependencias
```

### 4. Before Pushing
- ✅ Prueba localmente
- ✅ Verifica git status
- ✅ Revisa cambios: git diff
- ✅ Haz commit atómicos
- ✅ Escribe buen mensaje de commit

---

## 🚀 PRÓXIMOS PASOS

Una vez que hayas configurado Git:

1. **Proteger Rama Main:**
   - GitHub Settings → Branches → Add rule
   - Require pull request reviews
   - Require status checks

2. **Agregar Colaboradores:**
   - GitHub Settings → Collaborators
   - Invita a tu equipo

3. **Configurar CI/CD:**
   - GitHub Actions para tests automáticos
   - Deploy automático a producción

4. **Crear Issues:**
   - Para bugs y features
   - Vincular a PRs

---

## ✅ CHECKLIST FINAL

- [ ] Git instalado (2.51.0 ✅)
- [ ] .gitignore creado
- [ ] `git init` ejecutado
- [ ] User.name configurado
- [ ] User.email configurado
- [ ] Primer commit hecho
- [ ] Rama main creada
- [ ] Repositorio GitHub creado
- [ ] Remote "origin" agregado
- [ ] `git push` exitoso
- [ ] Puedo ver mis cambios en GitHub

---

## 🆘 Problemas Comunes

### Error: "fatal: not a git repository"
```powershell
cd al directorio correcto
git init
```

### Error: "permission denied"
- Verifica que tienes acceso al repositorio GitHub
- Configura SSH o Personal Access Token

### Error: "branch 'main' set to track remote which does not exist"
```powershell
git push -u origin main
```

### Error: "Could not read from remote repository"
- Verifica que Git está configurado con GitHub
- Usa SSH o HTTPS correctamente

---

## 📚 Recursos

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

¡Listo para controlar versiones! 🎉
