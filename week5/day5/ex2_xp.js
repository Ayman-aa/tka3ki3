const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = crypto.randomBytes(64).toString('hex');

app.use(bodyParser.json());

const users = [];
const failedLoginAttempts = {};

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            role: 'user'
        };
        users.push(newUser);
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (failedLoginAttempts[email] && failedLoginAttempts[email].count >= 5) {
            const lockoutTime = 15 * 60 * 1000;
            const timeElapsed = Date.now() - failedLoginAttempts[email].timestamp;
            if (timeElapsed < lockoutTime) {
                return res.status(403).json({
                    message: 'Account locked due to multiple failed attempts. Try again later.'
                });
            } else {
                failedLoginAttempts[email] = { count: 0, timestamp: Date.now() };
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            if (!failedLoginAttempts[email]) {
                failedLoginAttempts[email] = { count: 0, timestamp: Date.now() };
            }
            failedLoginAttempts[email].count += 1;
            failedLoginAttempts[email].timestamp = Date.now();
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        failedLoginAttempts[email] = { count: 0, timestamp: Date.now() };
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

app.get('/api/profile', auth, (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    });
});

app.get('/api/admin', auth, authorize('admin'), (req, res) => {
    res.json({ message: 'Admin access granted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
