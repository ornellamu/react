require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('./config/db');

const servicePackageRoutes = require('./routes/servicePackageRoutes');
const packageRoutes = require('./routes/packageRoutes');
const carRoutes = require('./routes/carRoutes');
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

//routes
app.use('/api/packages', packageRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/services', servicePackageRoutes);
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});