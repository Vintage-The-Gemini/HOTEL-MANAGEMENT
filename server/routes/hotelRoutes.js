// server/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all hotels - accessible by authorized users
router.get('/', verifyToken, hotelController.getAll);

// Get hotel by ID
router.get('/:id', verifyToken, hotelController.getById);

// Create new hotel - only system admins can create hotels
router.post('/', verifyToken, checkRole('SYSTEM_ADMIN'), hotelController.create);

// Update hotel
router.put('/:id', verifyToken, checkRole(['SYSTEM_ADMIN', 'HOTEL_ADMIN']), hotelController.update);

// Delete hotel - only system admins can delete hotels
router.delete('/:id', verifyToken, checkRole('SYSTEM_ADMIN'), hotelController.delete);

// Update hotel branding
router.put('/:id/branding', verifyToken, checkRole(['SYSTEM_ADMIN', 'HOTEL_ADMIN']), hotelController.updateBranding);

// Update hotel tax settings
router.put('/:id/tax-settings', verifyToken, checkRole(['SYSTEM_ADMIN', 'HOTEL_ADMIN']), hotelController.updateTaxSettings);

module.exports = router;