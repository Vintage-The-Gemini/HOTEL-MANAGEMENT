// server/models/Inquiry.js
const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    hotelId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hotel', 
        required: true 
    },
    client: {
        clientId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Client' 
        }, // May be null for new clients
        name: String,
        email: String,
        phone: String,
        organization: String
    },
    eventDetails: {
        type: { 
            type: String, 
            enum: ['CONFERENCE', 'LODGING', 'MIXED'], 
            required: true 
        },
        startDate: Date,
        endDate: Date,
        guestCount: Number,
        purpose: String
    },
    requirements: {
        conferencing: {
            isRequired: Boolean,
            roomCount: Number,
            setupStyle: String,
            equipment: [String],
            refreshments: Boolean
        },
        lodging: {
            isRequired: Boolean,
            roomCount: Number,
            guestsPerRoom: Number,
            mealPlan: [String]
        },
        transport: {
            isRequired: Boolean,
            vehicleType: String,
            pickupLocation: String,
            isRoundTrip: Boolean
        },
        additionalServices: [String]
    },
    source: {
        channel: String, // Website, Phone, Email, Agent, etc.
        agentId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Agent' 
        }, // If came through an agent
        campaign: String // Marketing campaign identifier
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    status: { 
        type: String, 
        enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'QUOTATION_SENT', 'CONVERTED', 'LOST'], 
        default: 'NEW' 
    },
    notes: [{ 
        text: String, 
        addedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }, 
        addedAt: { 
            type: Date, 
            default: Date.now 
        } 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Inquiry', InquirySchema);