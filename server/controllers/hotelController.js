// server/controllers/hotelController.js
const Hotel = require('../models/Hotel');

const hotelController = {
    // Get all hotels
    getAll: async (req, res) => {
        try {
            const hotels = await Hotel.find();
            res.status(200).json(hotels);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get hotel by ID
    getById: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id);
            
            if (!hotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            
            res.status(200).json(hotel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Create a new hotel
    create: async (req, res) => {
        try {
            const {
                name,
                address,
                contact,
                branding,
                taxSettings,
                paymentSettings
            } = req.body;
            
            const hotel = new Hotel({
                name,
                address,
                contact,
                branding,
                taxSettings,
                paymentSettings
            });
            
            const savedHotel = await hotel.save();
            res.status(201).json(savedHotel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update a hotel
    update: async (req, res) => {
        try {
            const {
                name,
                address,
                contact,
                branding,
                taxSettings,
                paymentSettings
            } = req.body;
            
            const updatedHotel = await Hotel.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    address,
                    contact,
                    branding,
                    taxSettings,
                    paymentSettings,
                    updatedAt: Date.now()
                },
                { new: true }
            );
            
            if (!updatedHotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            
            res.status(200).json(updatedHotel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Delete a hotel
    delete: async (req, res) => {
        try {
            const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
            
            if (!deletedHotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            
            res.status(200).json({ message: 'Hotel deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update hotel branding
    updateBranding: async (req, res) => {
        try {
            const { logo, primaryColor, secondaryColor } = req.body;
            
            const hotel = await Hotel.findById(req.params.id);
            
            if (!hotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            
            hotel.branding = {
                logo: logo || hotel.branding?.logo,
                primaryColor: primaryColor || hotel.branding?.primaryColor,
                secondaryColor: secondaryColor || hotel.branding?.secondaryColor
            };
            
            hotel.updatedAt = Date.now();
            
            const updatedHotel = await hotel.save();
            
            res.status(200).json(updatedHotel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Update hotel tax settings
    updateTaxSettings: async (req, res) => {
        try {
            const { salesTax, serviceTax, otherTaxes } = req.body;
            
            const hotel = await Hotel.findById(req.params.id);
            
            if (!hotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            
            hotel.taxSettings = {
                salesTax: salesTax !== undefined ? salesTax : hotel.taxSettings?.salesTax,
                serviceTax: serviceTax !== undefined ? serviceTax : hotel.taxSettings?.serviceTax,
                otherTaxes: otherTaxes || hotel.taxSettings?.otherTaxes
            };
            
            hotel.updatedAt = Date.now();
            
            const updatedHotel = await hotel.save();
            
            res.status(200).json(updatedHotel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = hotelController;