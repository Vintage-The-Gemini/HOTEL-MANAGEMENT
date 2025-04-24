// server/routes/quotationRoutes.js
const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const { verifyToken } = require('../middleware/auth');

// Get all quotations
router.get('/', verifyToken, quotationController.getAll);

// Get quotation by ID
router.get('/:id', verifyToken, quotationController.getById);

// Create new quotation
router.post('/', verifyToken, quotationController.create);

// Update quotation
router.put('/:id', verifyToken, quotationController.update);

// Delete quotation
router.delete('/:id', verifyToken, quotationController.delete);

// Send quotation to client
router.post('/:id/send', verifyToken, quotationController.sendQuotation);

// Update quotation status (accept/reject)
router.put('/:id/status', verifyToken, quotationController.updateStatus);

// Add note to quotation
router.post('/:id/notes', verifyToken, quotationController.addNote);

module.exports = router;