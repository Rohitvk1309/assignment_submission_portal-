const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user'); // Make sure the path is correct
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes); // Mount your routes at the /api base path

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
