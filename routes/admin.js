const express = require('express');
const jwt = require('jsonwebtoken');
const Assignment = require('../models/Assignment');
const User = require('../models/User');
const router = express.Router();

// Register new admin
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ username, password: hashedPassword, role: 'admin' });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered' });
});

// Admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await User.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: admin._id, role: admin.role }, 'your_jwt_secret');
    res.json({ token });
});

// View assignments tagged to the admin
router.get('/assignments', async (req, res) => {
    const { userId } = req.user;
    const assignments = await Assignment.find({ admin: userId });
    res.json(assignments);
});

// Accept assignment
router.post('/assignments/:id/accept', async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    assignment.status = 'accepted';
    await assignment.save();
    res.json({ message: 'Assignment accepted' });
});

// Reject assignment
router.post('/assignments/:id/reject', async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    assignment.status = 'rejected';
    await assignment.save();
    res.json({ message: 'Assignment rejected' });
});

module.exports = router;
