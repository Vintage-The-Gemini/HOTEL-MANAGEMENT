// server/services/notificationService.js
const Notification = require('../models/Notification');

const notificationService = {
    // Create a new notification
    createNotification: async ({ userId, title, message, relatedModel, relatedId }) => {
        try {
            const notification = new Notification({
                userId,
                title,
                message,
                relatedModel,
                relatedId,
                isRead: false
            });
            
            await notification.save();
            return notification;
        } catch (error) {
            console.error('Error creating notification:', error);
            throw error;
        }
    },
    
    // Get unread notifications for a user
    getUserNotifications: async (userId) => {
        try {
            const notifications = await Notification.find({ 
                userId,
                isRead: false 
            }).sort({ createdAt: -1 });
            
            return notifications;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },
    
    // Mark notification as read
    markAsRead: async (notificationId) => {
        try {
            const notification = await Notification.findByIdAndUpdate(
                notificationId,
                { isRead: true },
                { new: true }
            );
            
            return notification;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },
    
    // Mark all notifications as read for a user
    markAllAsRead: async (userId) => {
        try {
            await Notification.updateMany(
                { userId, isRead: false },
                { isRead: true }
            );
            
            return { success: true };
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    },
    
    // Delete a notification
    deleteNotification: async (notificationId) => {
        try {
            await Notification.findByIdAndDelete(notificationId);
            return { success: true };
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }
};

module.exports = notificationService;