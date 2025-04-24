// server/controllers/inquiryController.js
const Inquiry = require('../models/Inquiry');
const User = require('../models/User');

const inquiryController = {
    // Get all inquiries
    getAll: async (req, res) => {
        try {
            const { hotelId, status, startDate, endDate } = req.query;
            
            // Build query filters
            const filters = {};
            
            // User can only access inquiries from their hotel, unless they're a system admin
            if (req.user.role !== 'SYSTEM_ADMIN') {
                filters.hotelId = req.user.hotelId;
            } else if (hotelId) {
                filters.hotelId = hotelId;
            }
            
            if (status) {
                filters.status = status;
            }
            
            // Date range filter
            if (startDate || endDate) {
                filters.createdAt = {};
                if (startDate) {
                    filters.createdAt.$gte = new Date(startDate);
                }
                if (endDate) {
                    filters.createdAt.$lte = new Date(endDate);
                }
            }
            
            const inquiries = await Inquiry.find(filters)
                .sort({ createdAt: -1 });
            
            res.status(200).json(inquiries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get inquiry by ID
    getById: async (req, res) => {
        try {
            const inquiry = await Inquiry.findById(req.params.id);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            res.status(200).json(inquiry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Create a new inquiry
    create: async (req, res) => {
        try {
            const {
                hotelId,
                client,
                eventDetails,
                requirements,
                source,
                status,
                notes
            } = req.body;
            
            // Check if user has access to specified hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== hotelId) {
                return res.status(403).json({ message: 'You can only create inquiries for your assigned hotel' });
            }
            
            const inquiry = new Inquiry({
                hotelId,
                client,
                eventDetails,
                requirements,
                source,
                assignedTo: req.user.id, // Assign to the creator by default
                status: status || 'NEW',
                notes: notes ? [{ text: notes, addedBy: req.user.id }] : []
            });
            
            const savedInquiry = await inquiry.save();
            
            res.status(201).json(savedInquiry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update inquiry
    update: async (req, res) => {
        try {
            const {
                client,
                eventDetails,
                requirements,
                source,
                assignedTo,
                status
            } = req.body;
            
            const inquiry = await Inquiry.findById(req.params.id);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Update fields
            if (client) inquiry.client = client;
            if (eventDetails) inquiry.eventDetails = eventDetails;
            if (requirements) inquiry.requirements = requirements;
            if (source) inquiry.source = source;
            if (assignedTo) inquiry.assignedTo = assignedTo;
            if (status) inquiry.status = status;
            
            inquiry.updatedAt = Date.now();
            
            const updatedInquiry = await inquiry.save();
            
            res.status(200).json(updatedInquiry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Delete inquiry
    delete: async (req, res) => {
        try {
            const inquiry = await Inquiry.findById(req.params.id);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Only managers and admins can delete inquiries
            if (!['SYSTEM_ADMIN', 'HOTEL_ADMIN', 'SALES_MANAGER'].includes(req.user.role)) {
                return res.status(403).json({ message: 'You do not have permission to delete inquiries' });
            }
            
            await Inquiry.findByIdAndDelete(req.params.id);
            
            res.status(200).json({ message: 'Inquiry deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Add a note to inquiry
    addNote: async (req, res) => {
        try {
            const { text } = req.body;
            
            if (!text) {
                return res.status(400).json({ message: 'Note text is required' });
            }
            
            const inquiry = await Inquiry.findById(req.params.id);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Add note
            inquiry.notes.push({
                text,
                addedBy: req.user.id,
                addedAt: Date.now()
            });
            
            inquiry.updatedAt = Date.now();
            
            const updatedInquiry = await inquiry.save();
            
            res.status(200).json(updatedInquiry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update inquiry status
    updateStatus: async (req, res) => {
        try {
            const { status } = req.body;
            
            if (!['NEW', 'CONTACTED', 'QUALIFIED', 'QUOTATION_SENT', 'CONVERTED', 'LOST'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            
            const inquiry = await Inquiry.findById(req.params.id);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            inquiry.status = status;
            inquiry.updatedAt = Date.now();
            
            const updatedInquiry = await inquiry.save();
            
            res.status(200).json(updatedInquiry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Assign inquiry to user
    assignInquiry: async (req, res) => {
        try {
            const { userId } = req.body;
            
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            
            // Check if assigned user exists
            const userToAssign = await User.findById(userId);
            
            if (!userToAssign) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const inquiry = await Inquiry.findById(req.params.id);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Check if assigned user belongs to same hotel as inquiry
            if (userToAssign.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(400).json({ message: 'User must belong to same hotel as inquiry' });
            }
            
            inquiry.assignedTo = userId;
            inquiry.updatedAt = Date.now();
            
            const updatedInquiry = await inquiry.save();
            
            res.status(200).json(updatedInquiry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = inquiryController;