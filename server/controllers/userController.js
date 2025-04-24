// server/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userController = {
    // Get all users
    getAll: async (req, res) => {
        try {
            const { hotelId } = req.query;
            
            // Build query filters
            const filters = {};
            
            // System admin can see all users, hotel admin only sees users from their hotel
            if (req.user.role === 'HOTEL_ADMIN') {
                filters.hotelId = req.user.hotelId;
            } else if (hotelId) {
                filters.hotelId = hotelId;
            }
            
            const users = await User.find(filters).select('-password');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get user by ID
    getById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Only allow self or admin to view user details
            if (req.user.id !== user._id.toString() && 
                !['SYSTEM_ADMIN', 'HOTEL_ADMIN'].includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Hotel admins can only view users from their hotel
            if (req.user.role === 'HOTEL_ADMIN' && 
                user.hotelId && 
                user.hotelId.toString() !== req.user.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Create new user
    create: async (req, res) => {
        try {
            const { name, email, password, role, hotelId, status } = req.body;
            
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            
            // Hotel admins can only create users for their hotel
            if (req.user.role === 'HOTEL_ADMIN' && hotelId !== req.user.hotelId.toString()) {
                return res.status(403).json({ message: 'You can only create users for your hotel' });
            }
            
            // Restrict role creation based on creator's role
            if (req.user.role === 'HOTEL_ADMIN' && 
                ['SYSTEM_ADMIN', 'HOTEL_ADMIN'].includes(role)) {
                return res.status(403).json({ message: 'You cannot create admin users' });
            }
            
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Create user
            const user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                hotelId,
                status: status || 'ACTIVE'
            });
            
            const savedUser = await user.save();
            
            // Don't return password
            const userToReturn = savedUser.toObject();
            delete userToReturn.password;
            
            res.status(201).json(userToReturn);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update user
    update: async (req, res) => {
        try {
            const { name, email, password, role, hotelId, status } = req.body;
            
            const user = await User.findById(req.params.id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Only allow self or admin to update user
            if (req.user.id !== user._id.toString() && 
                !['SYSTEM_ADMIN', 'HOTEL_ADMIN'].includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Hotel admins can only update users from their hotel
            if (req.user.role === 'HOTEL_ADMIN' && 
                user.hotelId && 
                user.hotelId.toString() !== req.user.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Users can only update certain fields for themselves
            if (req.user.id === user._id.toString() && 
                !['SYSTEM_ADMIN', 'HOTEL_ADMIN'].includes(req.user.role)) {
                // Regular users can only update name, email, and password
                if (role || hotelId || status) {
                    return res.status(403).json({ message: 'You can only update your personal information' });
                }
            }
            
            // Update fields
            if (name) user.name = name;
            if (email) user.email = email;
            
            // Only update password if provided
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
            
            // Only admins can update these fields
            if (['SYSTEM_ADMIN', 'HOTEL_ADMIN'].includes(req.user.role)) {
                if (role) user.role = role;
                if (status) user.status = status;
                
                // Only system admin can change hotel
                if (hotelId && req.user.role === 'SYSTEM_ADMIN') {
                    user.hotelId = hotelId;
                }
            }
            
            user.updatedAt = Date.now();
            
            const updatedUser = await user.save();
            
            // Don't return password
            const userToReturn = updatedUser.toObject();
            delete userToReturn.password;
            
            res.status(200).json(userToReturn);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Delete user
    delete: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            // Hotel admins can only delete users from their hotel
            if (req.user.role === 'HOTEL_ADMIN' && 
                user.hotelId && 
                user.hotelId.toString() !== req.user.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Hotel admins cannot delete other admins
            if (req.user.role === 'HOTEL_ADMIN' && 
                ['SYSTEM_ADMIN', 'HOTEL_ADMIN'].includes(user.role)) {
                return res.status(403).json({ message: 'You cannot delete admin users' });
            }
            
            await User.findByIdAndDelete(req.params.id);
            
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;