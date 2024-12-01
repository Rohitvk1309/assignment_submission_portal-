// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');
// const Assignment = require('./models/Assignment');
// const userRoutes = require('./routes/user');  // Ensure this is declared before using it
// const adminRoutes = require('./routes/admin');
// const authenticate = require('./middleware/auth');

// const app = express();

// // Middleware Setup
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/assignment_portal', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log('Error connecting to MongoDB:', err));

// // Routes
// app.use('/user', userRoutes);  // Use userRoutes after it is declared
// app.use('/admin', authenticate, adminRoutes);  // Use authenticate middleware here

// // Server Setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


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
