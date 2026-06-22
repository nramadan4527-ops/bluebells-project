#!/bin/bash

# Bluebells Backend Setup Script

echo "🚀 Installing Bluebells Backend..."

cd "$(dirname "$0")/backend"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure MongoDB is running (mongod)"
echo "2. Update .env file with your MongoDB URI if needed"
echo "3. Run: npm run dev (for development)"
echo "4. Or run: npm start (for production)"
echo ""
echo "🔗 API will be available at: http://localhost:5000"
echo "📚 See backend/README.md for more information"
