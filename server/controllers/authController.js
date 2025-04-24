// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    // User registration
    register: async (req, res) => {
        try {
            const { name, email, password, role, hotelId } = req.body;
            
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Create new user
            const user = new User({
                name,
                email,
                password: hashedPassword,
                role: role || 'SALES_REP',
                hotelId
            });
            
            await user.save();
            
            // Create JWT token
            const token = jwt.sign(
                { id: user._id, role: user.role, hotelId: user.hotelId },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            
            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                secure: process.env.NODE_ENV === 'production'
            });
            
            // Return user data (without password)
            res.status(201).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    hotelId: user.hotelId
                },
                token
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            
            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            
            // Create JWT token
            const token = jwt.sign(
                { id: user._id, role: user.role, hotelId: user.hotelId },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            
            // Update last login
            user.lastLogin = Date.now();
            await user.save();
            
            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                secure: process.env.NODE_ENV === 'production'
            });
            
            // Return user data
            res.status(200).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    hotelId: user.hotelId,
                    lastLogin: user.lastLogin
                },
                token
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // User logout
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    },
    
    // Verify token
    verifyToken: async (req, res) => {
        try {
            const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: 'No token, authorization denied' });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            
            res.status(200).json({ 
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    hotelId: user.hotelId,
                    lastLogin: user.lastLogin
                }
            });
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    },
    
    // Forgot password
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Generate reset token (normally would send email here)
            const resetToken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            // In a real app, send email with reset link
            // For now, just return the token for testing
            res.status(200).json({ 
                message: 'Password reset token generated',
                resetToken 
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Reset password
    resetPassword: async (req, res) => {
        try {
            const { token, password } = req.body;
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Update user password
            await User.findByIdAndUpdate(
                decoded.id,
                { password: hashedPassword },
                { new: true }
            );
            
            res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = authController;