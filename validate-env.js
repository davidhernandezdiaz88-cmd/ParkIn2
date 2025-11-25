#!/usr/bin/env node

/**
 * Validar que todas las variables de entorno necesarias están configuradas
 * para producción
 */

const requiredVars = {
  MONGODB_URI: {
    description: 'MongoDB Atlas connection string',
    example: 'mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/parkin?retryWrites=true&w=majority',
    platform: 'Backend (Render)'
  },
  JWT_SECRET: {
    description: 'Secret key para firmar JWTs',
    example: 'aXJjB7hGk2mN9Lp0Q1RsT2UvWxYzA3BcD4EfG5HiJ6KlM7NoPqRsT8UvWxYz',
    platform: 'Backend (Render)'
  },
  CORS_ORIGIN: {
    description: 'URL del frontend para CORS',
    example: 'https://parkin2.netlify.app',
    platform: 'Backend (Render)'
  },
  VITE_API_BASE: {
    description: 'URL base del API para el frontend',
    example: 'https://parkin-backend-xxxx.render.com/api',
    platform: 'Frontend (Netlify)'
  }
};

console.log('\n' + '='.repeat(70));
console.log('🔐 Validador de Variables de Entorno para Producción');
console.log('='.repeat(70) + '\n');

console.log('Variables requeridas:\n');

let allValid = true;

Object.entries(requiredVars).forEach(([key, config]) => {
  const value = process.env[key];
  const isSet = !!value && value.trim() !== '';
  const status = isSet ? '✓' : '✗';
  const color = isSet ? '\x1b[32m' : '\x1b[31m';
  const reset = '\x1b[0m';
  
  console.log(`${color}${status}${reset} ${key}`);
  console.log(`   Plataforma: ${config.platform}`);
  console.log(`   Descripción: ${config.description}`);
  if (!isSet) {
    console.log(`   Ejemplo: ${config.example}`);
    allValid = false;
  }
  console.log();
});

console.log('='.repeat(70));

if (allValid) {
  console.log('✓ ¡Todas las variables están configuradas correctamente!');
  console.log('\nPuedes proceder con el deployment.');
} else {
  console.log('✗ Faltan variables de entorno.\n');
  console.log('Para producción:');
  console.log('  1. Render → Environment variables');
  console.log('  2. Netlify → Build & deploy → Environment');
  console.log('  3. Sigue PRODUCTION_SETUP.md para valores específicos');
}

console.log('='.repeat(70) + '\n');

process.exit(allValid ? 0 : 1);
