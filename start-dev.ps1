#!/usr/bin/env powershell
# ParkIn Development Launcher
# Starts backend (with in-memory MongoDB) and frontend

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting ParkIn Development Servers" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if npm is installed
if(-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm not found. Please install Node.js" -ForegroundColor Red
    exit 1
}

# Ensure backend dependencies
Write-Host "`n📦 Checking backend dependencies..." -ForegroundColor Cyan
if(-not (Test-Path "backend/node_modules")) {
    Write-Host "Installing backend packages..." -ForegroundColor Yellow
    cd backend
    npm install
    cd ..
}

# Ensure frontend dependencies
Write-Host "`n📦 Checking frontend dependencies..." -ForegroundColor Cyan
if(-not (Test-Path "frontend/node_modules")) {
    Write-Host "Installing frontend packages..." -ForegroundColor Yellow
    cd frontend
    npm install
    cd ..
}

# Start backend in background
Write-Host "`n🔧 Starting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev:mem" -PassThru

# Wait for backend to be ready
Write-Host "⏳ Waiting for backend to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Start frontend
Write-Host "`n🎨 Starting frontend server..." -ForegroundColor Cyan
cd frontend
npm run dev

Write-Host "`n✅ Development servers started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "Backend: http://localhost:4000" -ForegroundColor Green
