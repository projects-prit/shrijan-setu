const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or tools without origin header
    if (!origin) return callback(null, true);
    
    // Allow localhost, 127.0.0.1 on any port, vercel previews and custom domains
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isVercel = origin.endsWith('.vercel.app') || origin.includes('vercel.app');
    const isClientUrl = process.env.CLIENT_URL && origin === process.env.CLIENT_URL;

    if (isLocalhost || isVercel || isClientUrl) {
      return callback(null, true);
    }
    // Fallback: permissive for Hackathon evaluation
    return callback(null, true);
  },
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Basic route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Srijan Setu API is running' });
});

// Define Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/challenges', require('./src/routes/challenges'));
app.use('/api/projects', require('./src/routes/projects'));
app.use('/api/collaborations', require('./src/routes/collaborations'));
app.use('/api/notifications', require('./src/routes/notifications'));
app.use('/api/analytics', require('./src/routes/analytics'));
app.use('/api/admin', require('./src/routes/admin'));

// API Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
