# PowerShell script to generate a secure JWT Secret for production

Write-Host "================================================"
Write-Host "🔐 JWT Secret Generator for Production"
Write-Host "================================================"
Write-Host ""

# Generate random bytes and convert to base64
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$rng.GetBytes($bytes)
$jwtSecret = [Convert]::ToBase64String($bytes)

Write-Host "Generated JWT_SECRET:"
Write-Host ""
Write-Host $jwtSecret
Write-Host ""
Write-Host "================================================"
Write-Host "📋 Copy this value and paste it in:"
Write-Host ""
Write-Host "1. Render Dashboard → Environment Variables"
Write-Host "   Key: JWT_SECRET"
Write-Host "   Value: (paste the above)"
Write-Host ""
Write-Host "2. Your local .env file for testing"
Write-Host "================================================"

# Copy to clipboard on Windows
$jwtSecret | Set-Clipboard
Write-Host ""
Write-Host "✓ JWT Secret copied to clipboard!"
