// server/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/auth');

// Get all notifications for current user
router.get('/', verifyToken, notificationController.getAll);

// Get notification by ID
router.get('/:id', verifyToken, notificationController.getById);

// Create new notification
router.post('/', verifyToken, notificationController.create);

// Mark notification as read
router.put('/:id/read', verifyToken, notificationController.markAsRead);

// Mark all notifications as read
router.put('/mark-all-read', verifyToken, notificationController.markAllAsRead);

// Delete notification
router.delete('/:id', verifyToken, notificationController.delete);

module.exports = router;