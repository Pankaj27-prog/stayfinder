#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React app
echo "Building React app..."
npm run build

# Verify build was created
if [ -d "build" ]; then
    echo "Build completed successfully!"
    echo "Build directory contents:"
    ls -la build/
else
    echo "ERROR: Build directory not found!"
    exit 1
fi

echo "Build process completed!" 