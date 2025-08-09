#!/bin/bash

# dev-server.sh - Simple development server for static website
# Usage: ./dev-server.sh [port]

echo "🚀 Starting development server..."
echo "================================="

# Default port
PORT=${1:-3000}

# Ensure dist exists
if [ ! -d "dist" ]; then
  echo "🛠️  dist/ not found. Running build first..."
  if command -v node &> /dev/null; then
    node build.js || { echo "❌ Build failed"; exit 1; }
  else
    echo "❌ Node.js not installed. Cannot build dist/"
    exit 1
  fi
fi

cd dist || { echo "❌ Failed to enter dist/"; exit 1; }

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "📡 Using Python 3 HTTP server on port $PORT"
    echo "🌐 Open your browser to: http://localhost:$PORT"
    echo "📁 Serving files from: $(pwd)"
    echo ""
    echo "💡 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "📡 Using Python HTTP server on port $PORT"
    echo "🌐 Open your browser to: http://localhost:$PORT"
    echo "📁 Serving files from: $(pwd)"
    echo ""
    echo "💡 Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer $PORT
elif command -v php &> /dev/null; then
    echo "📡 Using PHP development server on port $PORT"
    echo "🌐 Open your browser to: http://localhost:$PORT"
    echo "📁 Serving files from: $(pwd)"
    echo ""
    echo "💡 Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:$PORT
elif command -v node &> /dev/null; then
    echo "📡 Using Node.js http-server on port $PORT"
    echo "🌐 Open your browser to: http://localhost:$PORT"
    echo "📁 Serving files from: $(pwd)"
    echo ""
    echo "💡 Press Ctrl+C to stop the server"
    echo ""
    npx http-server -p $PORT -o
else
    echo "❌ No suitable server found!"
    echo ""
    echo "💡 Install one of these options:"
    echo "   • Python 3 (usually pre-installed on macOS)"
    echo "   • PHP: brew install php"
    echo "   • Node.js: brew install node"
    echo ""
    echo "🔧 Or manually open index.html in your browser"
    exit 1
fi 