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

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', authRoutes);
app.use('/api', bookingRoutes);

// Check if build directory exists
const buildPath = path.join(__dirname, '../build');
const indexPath = path.join(buildPath, 'index.html');

if (fs.existsSync(buildPath)) {
  // Serve static files from the React build directory
  app.use(express.static(buildPath));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('React app not built yet. Please wait for build to complete.');
    }
  });
} else {
  // If build doesn't exist, serve a simple message
  app.get('*', (req, res) => {
    res.send(`
      <html>
        <head><title>StayFinder - Building...</title></head>
        <body>
          <h1>StayFinder</h1>
          <p>Application is building. Please wait a moment and refresh the page.</p>
          <script>setTimeout(() => window.location.reload(), 5000);</script>
        </body>
      </html>
    `);
  });
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err)); 