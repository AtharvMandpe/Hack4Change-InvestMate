// index.js or server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors
const app = express();

// Connect Database
connectDB();
app.use(cors());
// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));

app.use('/api/projects', require('./routes/projects'));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
