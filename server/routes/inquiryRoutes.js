// server/routes/inquiryRoutes.js
const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { verifyToken } = require('../middleware/auth');

// Get all inquiries
router.get('/', verifyToken, inquiryController.getAll);

// Get inquiry by ID
router.get('/:id', verifyToken, inquiryController.getById);

// Create new inquiry
router.post('/', verifyToken, inquiryController.create);

// Update inquiry
router.put('/:id', verifyToken, inquiryController.update);

// Delete inquiry
router.delete('/:id', verifyToken, inquiryController.delete);

// Add note to inquiry
router.post('/:id/notes', verifyToken, inquiryController.addNote);

// Update inquiry status
router.put('/:id/status', verifyToken, inquiryController.updateStatus);

// Assign inquiry to user
router.put('/:id/assign', verifyToken, inquiryController.assignInquiry);

module.exports = router;