// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all users - admin only
router.get('/', verifyToken, checkRole(['SYSTEM_ADMIN', 'HOTEL_ADMIN']), userController.getAll);

// Get user by ID
router.get('/:id', verifyToken, userController.getById);

// Create new user - admin only
router.post('/', verifyToken, checkRole(['SYSTEM_ADMIN', 'HOTEL_ADMIN']), userController.create);

// Update user - self or admin only
router.put('/:id', verifyToken, userController.update);

// Delete user - admin only
router.delete('/:id', verifyToken, checkRole(['SYSTEM_ADMIN', 'HOTEL_ADMIN']), userController.delete);

module.exports = router;