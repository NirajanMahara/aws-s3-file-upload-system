/**
 * AWS S3 File Upload System
 * Author: Nirajan Mahara
 * Student ID: C0921977
 */

// Import necessary modules and configurations
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const { authenticate } = require('./middleware/auth');

const app = express();

// Security middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/upload', authenticate, uploadRoutes);

// Home route
app.get('/', authenticate, (req, res) => {
  res.render('index', {
    username: req.session.username,
    studentName: 'Nirajan Mahara',
    studentNumber: 'C0921977',
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
