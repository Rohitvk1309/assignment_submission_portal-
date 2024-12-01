// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Assignment = require('../models/Assignment');
// const router = express.Router();

// // Register new user
// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword, role: 'user' });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered' });
// });

// // User login
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
//     res.json({ token });
// });

// // Upload assignment
// router.post('/upload', async (req, res) => {
//     const { userId, task } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const newAssignment = new Assignment({ userId: user._id, task });
//     await newAssignment.save();
//     res.status(201).json({ message: 'Assignment uploaded' });
// });

// // Get all admins
// router.get('/admins', async (req, res) => {
//     const admins = await User.find({ role: 'admin' });
//     res.json(admins);
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role: 'user' });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
    res.json({ token });
});

// Upload assignment
router.post('/upload', async (req, res) => {
    const { userId, task } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const newAssignment = new Assignment({ userId: user._id, task });
    await newAssignment.save();
    res.status(201).json({ message: 'Assignment uploaded' });
});

// Get all admins
router.get('/admins', async (req, res) => {
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
});

module.exports = router;
