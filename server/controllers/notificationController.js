// server/controllers/notificationController.js
const notificationService = require('../services/notificationService');

const notificationController = {
    // Get all notifications for the current user
    getAll: async (req, res) => {
        try {
            const notifications = await notificationService.getUserNotifications(req.user.id);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get notification by ID
    getById: async (req, res) => {
        try {
            const notification = await Notification.findById(req.params.id);
            
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            
            // Users can only access their own notifications
            if (notification.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Create a new notification (used internally by the notification service)
    create: async (req, res) => {
        try {
            const { userId, title, message, relatedModel, relatedId } = req.body;
            
            // Only admins and managers can create notifications for others
            if (userId !== req.user.id && 
                !['SYSTEM_ADMIN', 'HOTEL_ADMIN', 'SALES_MANAGER'].includes(req.user.role)) {
                return res.status(403).json({ message: 'You can only create notifications for yourself' });
            }
            
            const notification = await notificationService.createNotification({
                userId,
                title,
                message,
                relatedModel,
                relatedId
            });
            
            res.status(201).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Mark notification as read
    markAsRead: async (req, res) => {
        try {
            const notification = await Notification.findById(req.params.id);
            
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            
            // Users can only update their own notifications
            if (notification.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            const updatedNotification = await notificationService.markAsRead(req.params.id);
            
            res.status(200).json(updatedNotification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Mark all notifications as read
    markAllAsRead: async (req, res) => {
        try {
            await notificationService.markAllAsRead(req.user.id);
            res.status(200).json({ message: 'All notifications marked as read' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Delete notification
    delete: async (req, res) => {
        try {
            const notification = await Notification.findById(req.params.id);
            
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            
            // Users can only delete their own notifications
            if (notification.userId.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            await notificationService.deleteNotification(req.params.id);
            
            res.status(200).json({ message: 'Notification deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = notificationController;