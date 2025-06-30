const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth.js');
const bookingRoutes = require('./routes/booking.js');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pankaj_sarwa:UEbeqOCj7qdrvQHi@cluster0.roqkcrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://stayfinder-kqyr.onrender.com']
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    buildPath: path.resolve(__dirname, '../build'),
    buildExists: fs.existsSync(path.resolve(__dirname, '../build'))
  });
});

// API Routes
app.use('/api', authRoutes);
app.use('/api', bookingRoutes);

// Serve static files from the React build directory
const buildPath = path.resolve(__dirname, '../build');
console.log('Build path:', buildPath);
console.log('Build exists:', fs.existsSync(buildPath));

if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(buildPath));

  // Handle React routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
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