require('dotenv').config();

const express = require('express');
const cors = require('cors');

require('./config/db');

const packageRoutes = require('./routes/packageRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Smart Park CWSMS Backend is running!');
});

// Package routes
app.use('/api/packages', packageRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});