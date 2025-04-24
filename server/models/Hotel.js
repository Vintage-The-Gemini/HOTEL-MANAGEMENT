// server/models/Hotel.js
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    contact: {
        email: String,
        phone: String,
        website: String
    },
    branding: {
        logo: String, // URL to logo image
        primaryColor: String,
        secondaryColor: String
    },
    taxSettings: {
        salesTax: Number, // Percentage
        serviceTax: Number, // Percentage
        otherTaxes: [{ 
            name: String, 
            rate: Number 
        }]
    },
    paymentSettings: {
        acceptedMethods: [String],
        defaultPaymentTerms: Number, // Days
        paymentInstructions: String
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

module.exports = mongoose.model('Hotel', HotelSchema);