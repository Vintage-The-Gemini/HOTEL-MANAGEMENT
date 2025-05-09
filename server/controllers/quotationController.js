// server/controllers/quotationController.js
const Quotation = require('../models/Quotation');
const Inquiry = require('../models/Inquiry');

const quotationController = {
    // Get all quotations
    getAll: async (req, res) => {
        try {
            const { hotelId, status, startDate, endDate, clientId } = req.query;
            
            // Build query filters
            const filters = {};
            
            // User can only access quotations from their hotel, unless they're a system admin
            if (req.user.role !== 'SYSTEM_ADMIN') {
                filters.hotelId = req.user.hotelId;
            } else if (hotelId) {
                filters.hotelId = hotelId;
            }
            
            if (status) {
                filters.status = status;
            }
            
            if (clientId) {
                filters.clientId = clientId;
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
            
            const quotations = await Quotation.find(filters)
                .sort({ createdAt: -1 });
            
            res.status(200).json(quotations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get quotation by ID
    getById: async (req, res) => {
        try {
            const quotation = await Quotation.findById(req.params.id);
            
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            
            // Check if user has access to this quotation's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== quotation.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            res.status(200).json(quotation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Create a new quotation from inquiry
    create: async (req, res) => {
        try {
            const {
                inquiryId,
                clientId,
                eventDetails,
                lineItems,
                subtotal,
                discounts,
                taxes,
                total,
                commission,
                validityDays = 7, // Default 7 days validity
                notes
            } = req.body;
            
            // Find the inquiry
            const inquiry = await Inquiry.findById(inquiryId);
            
            if (!inquiry) {
                return res.status(404).json({ message: 'Inquiry not found' });
            }
            
            // Check if user has access to this inquiry's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== inquiry.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Generate a simple reference number (in a real app, use the model method)
            const date = new Date();
            const reference = `Q-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
            
            // Calculate validity date
            const validUntil = new Date();
            validUntil.setDate(validUntil.getDate() + validityDays);
            
            const quotation = new Quotation({
                hotelId: inquiry.hotelId,
                inquiryId,
                clientId,
                reference,
                validUntil,
                eventDetails: eventDetails || {
                    startDate: inquiry.eventDetails.startDate,
                    endDate: inquiry.eventDetails.endDate,
                    guestCount: inquiry.eventDetails.guestCount
                },
                lineItems,
                subtotal,
                discounts,
                taxes,
                total,
                commission,
                status: 'DRAFT',
                notes: notes ? [{ text: notes, addedBy: req.user.id }] : [],
                createdBy: req.user.id,
                updatedBy: req.user.id
            });
            
            const savedQuotation = await quotation.save();
            
            // Update inquiry status
            inquiry.status = 'QUOTATION_SENT';
            inquiry.updatedAt = Date.now();
            await inquiry.save();
            
            res.status(201).json(savedQuotation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update quotation
    update: async (req, res) => {
        try {
            const {
                eventDetails,
                lineItems,
                subtotal,
                discounts,
                taxes,
                total,
                commission,
                validUntil,
                notes
            } = req.body;
            
            const quotation = await Quotation.findById(req.params.id);
            
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            
            // Check if user has access to this quotation's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== quotation.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Can't update if already accepted or rejected
            if (['ACCEPTED', 'REJECTED'].includes(quotation.status)) {
                return res.status(400).json({ message: `Cannot update a quotation that has been ${quotation.status.toLowerCase()}` });
            }
            
            // Update fields
            if (eventDetails) quotation.eventDetails = eventDetails;
            if (lineItems) quotation.lineItems = lineItems;
            if (subtotal !== undefined) quotation.subtotal = subtotal;
            if (discounts) quotation.discounts = discounts;
            if (taxes) quotation.taxes = taxes;
            if (total !== undefined) quotation.total = total;
            if (commission) quotation.commission = commission;
            if (validUntil) quotation.validUntil = validUntil;
            
            // Add note if provided
            if (notes) {
                quotation.notes.push({
                    text: notes,
                    addedBy: req.user.id,
                    addedAt: Date.now()
                });
            }
            
            quotation.updatedBy = req.user.id;
            quotation.updatedAt = Date.now();
            
            const updatedQuotation = await quotation.save();
            
            res.status(200).json(updatedQuotation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Delete quotation
    delete: async (req, res) => {
        try {
            const quotation = await Quotation.findById(req.params.id);
            
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            
            // Check if user has access to this quotation's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== quotation.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Only managers and admins can delete quotations
            if (!['SYSTEM_ADMIN', 'HOTEL_ADMIN', 'SALES_MANAGER'].includes(req.user.role)) {
                return res.status(403).json({ message: 'You do not have permission to delete quotations' });
            }
            
            // Can't delete if already accepted
            if (quotation.status === 'ACCEPTED') {
                return res.status(400).json({ message: 'Cannot delete an accepted quotation' });
            }
            
            await Quotation.findByIdAndDelete(req.params.id);
            
            res.status(200).json({ message: 'Quotation deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Send quotation to client
    sendQuotation: async (req, res) => {
        try {
            const quotation = await Quotation.findById(req.params.id);
            
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            
            // Check if user has access to this quotation's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== quotation.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Update status and sent time
            quotation.status = 'SENT';
            quotation.sentAt = Date.now();
            quotation.updatedBy = req.user.id;
            quotation.updatedAt = Date.now();
            
            const updatedQuotation = await quotation.save();
            
            // Update related inquiry status if not already updated
            if (quotation.inquiryId) {
                const inquiry = await Inquiry.findById(quotation.inquiryId);
                if (inquiry && inquiry.status !== 'QUOTATION_SENT') {
                    inquiry.status = 'QUOTATION_SENT';
                    inquiry.updatedAt = Date.now();
                    await inquiry.save();
                }
            }
            
            res.status(200).json({
                message: 'Quotation sent successfully',
                quotation: updatedQuotation
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update quotation status (accept/reject)
    updateStatus: async (req, res) => {
        try {
            const { status, notes } = req.body;
            
            if (!['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            
            const quotation = await Quotation.findById(req.params.id);
            
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            
            // Check if user has access to this quotation's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== quotation.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Update status
            quotation.status = status;
            quotation.respondedAt = Date.now();
            quotation.updatedBy = req.user.id;
            quotation.updatedAt = Date.now();
            
            // Add note if provided
            if (notes) {
                quotation.notes.push({
                    text: notes,
                    addedBy: req.user.id,
                    addedAt: Date.now()
                });
            }
            
            const updatedQuotation = await quotation.save();
            
            // If accepted, update related inquiry status
            if (status === 'ACCEPTED' && quotation.inquiryId) {
                const inquiry = await Inquiry.findById(quotation.inquiryId);
                if (inquiry) {
                    inquiry.status = 'CONVERTED';
                    inquiry.updatedAt = Date.now();
                    await inquiry.save();
                }
            }
            
            res.status(200).json(updatedQuotation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Add note to quotation
    addNote: async (req, res) => {
        try {
            const { text } = req.body;
            
            if (!text) {
                return res.status(400).json({ message: 'Note text is required' });
            }
            
            const quotation = await Quotation.findById(req.params.id);
            
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            
            // Check if user has access to this quotation's hotel
            if (req.user.role !== 'SYSTEM_ADMIN' && 
                req.user.hotelId.toString() !== quotation.hotelId.toString()) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            // Add note
            quotation.notes.push({
                text,
                addedBy: req.user.id,
                addedAt: Date.now()
            });
            
            quotation.updatedAt = Date.now();
            
            const updatedQuotation = await quotation.save();
            
            res.status(200).json(updatedQuotation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = quotationController;