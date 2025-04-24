// server/models/Quotation.js
const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
    hotelId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hotel', 
        required: true 
    },
    inquiryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Inquiry', 
        required: true 
    },
    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client' 
    },
    reference: { 
        type: String, 
        required: true, 
        unique: true 
    },
    validUntil: { 
        type: Date, 
        required: true 
    },
    eventDetails: {
        startDate: Date,
        endDate: Date,
        guestCount: Number
    },
    lineItems: [{
        category: { 
            type: String, 
            enum: ['CONFERENCE', 'LODGING', 'TRANSPORT', 'SERVICE', 'FOOD_BEVERAGE'] 
        },
        description: String,
        resourceId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Resource' 
        },
        quantity: Number,
        unit: String,
        unitPrice: Number,
        subtotal: Number
    }],
    subtotal: {
        type: Number,
        required: true
    },
    discounts: [{
        type: String,
        description: String,
        amount: Number
    }],
    taxes: [{
        name: String,
        rate: Number,
        amount: Number
    }],
    total: {
        type: Number,
        required: true
    },
    commission: {
        agentId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Agent' 
        },
        rate: Number,
        amount: Number
    },
    status: { 
        type: String, 
        enum: ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED'], 
        default: 'DRAFT' 
    },
    sentAt: Date,
    respondedAt: Date,
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
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    updatedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
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

// Method to generate a reference number for quotations
QuotationSchema.statics.generateReference = async function(hotelId) {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    
    // Get hotel code (first 3 letters of hotel name)
    let hotelCode = 'HTL';
    try {
        const Hotel = mongoose.model('Hotel');
        const hotel = await Hotel.findById(hotelId);
        if (hotel && hotel.name) {
            hotelCode = hotel.name.substring(0, 3).toUpperCase();
        }
    } catch (error) {
        console.error('Error getting hotel for reference:', error);
    }
    
    // Count quotations for this month to generate sequence number
    const count = await this.countDocuments({
        createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        },
        hotelId
    });
    
    const sequence = (count + 1).toString().padStart(4, '0');
    
    return `Q-${hotelCode}-${year}${month}-${sequence}`;
};

module.exports = mongoose.model('Quotation', QuotationSchema);