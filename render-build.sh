#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build React app
echo "Building React app..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "Build completed successfully!"
    ls -la build/
else
    echo "Build failed!"
    exit 1
fi 