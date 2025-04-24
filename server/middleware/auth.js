// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token middleware
exports.verifyToken = async (req, res, next) => {
    try {
        // Get token from header or cookie
        const token = req.cookies.token || 
                     (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
                     ? req.headers.authorization.split(' ')[1] : null);
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        if (user.status === 'INACTIVE') {
            return res.status(401).json({ message: 'Account is inactive' });
        }
        
        // Add user data to request
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            hotelId: user.hotelId
        };
        
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

// Check user role middleware
exports.checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // Convert single role to array for consistent handling
        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        next();
    };
};