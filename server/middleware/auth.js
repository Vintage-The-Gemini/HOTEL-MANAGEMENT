// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token middleware
exports.verifyToken = async (req, res, next) => {
    try {
        // Get token from header or cookie
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
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

// Check if user belongs to hotel middleware
exports.checkHotelAccess = () => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const hotelId = req.params.hotelId || req.body.hotelId;
        
        // System admins can access all hotels
        if (req.user.role === 'SYSTEM_ADMIN') {
            return next();
        }
        
        // Check if user belongs to specified hotel
        if (req.user.hotelId && req.user.hotelId.toString() !== hotelId) {
            return res.status(403).json({ message: 'You can only access your assigned hotel' });
        }
        
        next();
    };
};