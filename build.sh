#!/bin/bash

echo "🔨 Building n8n WhatsApp Multi-Session Node..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔧 Compiling TypeScript..."
npx tsc

# Copy icons
echo "🎨 Copying icons..."
mkdir -p dist/nodes/WhatsAppMultiSession
cp nodes/WhatsAppMultiSession/*.svg dist/nodes/WhatsAppMultiSession/

echo "✅ Build complete!"
echo ""
echo "📝 To install in n8n:"
echo "1. Copy the dist/ folder to your n8n custom nodes directory"
echo "2. Or publish to npm and install via n8n community nodes"
echo ""
echo "🔗 Dist folder contents:"
ls -la dist/