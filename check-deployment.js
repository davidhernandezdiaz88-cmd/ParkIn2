#!/usr/bin/env node

/**
 * ParkIn2 Production Deployment Helper
 * 
 * Este script ayuda a validar que todo está listo para desplegar en producción
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let allPassed = true;

function check(name, condition, hint = '') {
  const status = condition ? '✓' : '✗';
  const color = condition ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  
  console.log(`${color}${status}${reset} ${name}`);
  if (!condition && hint) {
    console.log(`  💡 ${hint}`);
  }
  
  if (!condition) allPassed = false;
}

console.log('\n' + '='.repeat(60));
console.log('🚀 ParkIn2 Production Deployment Checker');
console.log('='.repeat(60) + '\n');

// Verificar archivos de configuración
console.log('📋 Verificando archivos de configuración:\n');

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

check(
  'Backend package.json existe',
  fs.existsSync(path.join(backendDir, 'package.json')),
  'Asegúrate de tener package.json en /backend'
);

check(
  'Frontend package.json existe',
  fs.existsSync(path.join(frontendDir, 'package.json')),
  'Asegúrate de tener package.json en /frontend'
);

check(
  'Backend index.js existe',
  fs.existsSync(path.join(backendDir, 'src', 'index.js')),
  'Asegúrate de tener src/index.js en /backend'
);

check(
  'Frontend App.jsx existe',
  fs.existsSync(path.join(frontendDir, 'src', 'App.jsx')),
  'Asegúrate de tener src/App.jsx en /frontend'
);

check(
  'Netlify config existe',
  fs.existsSync(path.join(frontendDir, 'netlify.toml')),
  'Crea netlify.toml en /frontend'
);

check(
  'Render config existe',
  fs.existsSync(path.join(backendDir, 'render.yaml')),
  'Crea render.yaml en /backend'
);

// Verificar documentación
console.log('\n📚 Verificando documentación:\n');

check(
  'PRODUCTION_SETUP.md existe',
  fs.existsSync(path.join(__dirname, 'PRODUCTION_SETUP.md')),
  'Crea PRODUCTION_SETUP.md en la raíz'
);

check(
  'DEPLOYMENT_CHECKLIST.md existe',
  fs.existsSync(path.join(__dirname, 'DEPLOYMENT_CHECKLIST.md')),
  'Crea DEPLOYMENT_CHECKLIST.md en la raíz'
);

// Verificar repositorio Git
console.log('\n🔧 Verificando Git:\n');

const gitDir = path.join(__dirname, '.git');
check(
  'Repositorio Git inicializado',
  fs.existsSync(gitDir),
  'Ejecuta: git init && git add . && git commit -m "Initial commit"'
);

// Verificar dependencias instaladas
console.log('\n📦 Verificando dependencias:\n');

const backendNodeModules = fs.existsSync(path.join(backendDir, 'node_modules'));
check(
  'Backend node_modules instalados',
  backendNodeModules,
  'Ejecuta: cd backend && npm install'
);

const frontendNodeModules = fs.existsSync(path.join(frontendDir, 'node_modules'));
check(
  'Frontend node_modules instalados',
  frontendNodeModules,
  'Ejecuta: cd frontend && npm install'
);

// Resumen final
console.log('\n' + '='.repeat(60));
if (allPassed) {
  console.log('✓ ¡Todo listo para desplegar a producción!');
  console.log('\nPróximos pasos:');
  console.log('1. Lee PRODUCTION_SETUP.md');
  console.log('2. Sigue DEPLOYMENT_CHECKLIST.md paso a paso');
  console.log('3. Crea MongoDB Atlas cluster');
  console.log('4. Crea Render Web Service');
  console.log('5. Crea Netlify deployment');
} else {
  console.log('✗ Faltan algunas configuraciones.');
  console.log('\nRevisa los puntos marcados arriba y completa los pasos.');
}
console.log('='.repeat(60) + '\n');

process.exit(allPassed ? 0 : 1);
