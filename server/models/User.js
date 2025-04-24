// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['SYSTEM_ADMIN', 'HOTEL_ADMIN', 'SALES_MANAGER', 'SALES_REP', 'OPERATIONS'], 
        required: true 
    },
    hotelId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hotel' 
    },
    status: { 
        type: String, 
        enum: ['ACTIVE', 'INACTIVE'], 
        default: 'ACTIVE' 
    },
    lastLogin: { 
        type: Date 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', UserSchema);