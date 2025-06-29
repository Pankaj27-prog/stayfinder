const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth.js');
const bookingRoutes = require('./routes/booking.js');

const app = express();
const PORT = process.env.PORT || 10000; // Use Render's PORT or default to 10000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pankaj_sarwa:UEbeqOCj7qdrvQHi@cluster0.roqkcrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://stayfinder-kqyr.onrender.com', 'https://stayfinder-app.onrender.com']
    : true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api', authRoutes);
app.use('/api', bookingRoutes);

// Check if build directory exists
const buildPath = path.join(__dirname, '../build');
const indexPath = path.join(buildPath, 'index.html');

console.log('Build path:', buildPath);
console.log('Build exists:', fs.existsSync(buildPath));
console.log('Index exists:', fs.existsSync(indexPath));

// Serve static files from the React build directory if it exists
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`
        <html>
          <head>
            <title>StayFinder - Build Error</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              .error { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1>StayFinder</h1>
            <p class="error">Build files not found. Please check the build process.</p>
            <p>If you're deploying, please ensure the build command completed successfully.</p>
            <p>Build path: ${buildPath}</p>
            <p>Index path: ${indexPath}</p>
          </body>
        </html>
      `);
    }
  });
} else {
  // If build doesn't exist, serve a better loading message
  app.get('*', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>StayFinder - Building...</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              min-height: 100vh;
              margin: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: rgba(255,255,255,0.1);
              padding: 40px;
              border-radius: 10px;
              backdrop-filter: blur(10px);
            }
            .spinner {
              border: 4px solid rgba(255,255,255,0.3);
              border-top: 4px solid white;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 20px auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>StayFinder</h1>
            <div class="spinner"></div>
            <p>Application is building. Please wait a moment and refresh the page.</p>
            <p><small>This may take a few minutes on first deployment.</small></p>
            <p><small>Build path: ${buildPath}</small></p>
          </div>
          <script>
            // Auto-refresh every 30 seconds
            setTimeout(() => window.location.reload(), 30000);
          </script>
        </body>
      </html>
    `);
  });
}

// Enhanced error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Build path exists: ${fs.existsSync(buildPath)}`);
    console.log(`Index file exists: ${fs.existsSync(indexPath)}`);
    console.log(`Server is ready to handle requests`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  // Still start the server even if MongoDB fails
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (MongoDB connection failed)`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}); 