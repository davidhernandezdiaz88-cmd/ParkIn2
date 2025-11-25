#!/bin/bash

# Generate a secure JWT Secret for production
JWT_SECRET=$(openssl rand -base64 32)

echo "================================================"
echo "🔐 JWT Secret Generator for Production"
echo "================================================"
echo ""
echo "Generated JWT_SECRET:"
echo ""
echo "$JWT_SECRET"
echo ""
echo "================================================"
echo "📋 Copy this value and paste it in:"
echo ""
echo "1. Render Dashboard → Environment Variables"
echo "   Key: JWT_SECRET"
echo "   Value: (paste the above)"
echo ""
echo "2. Your local .env file for testing"
echo "================================================"
