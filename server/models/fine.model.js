const mongoose = require('mongoose');
const fineSchema = new mongoose.Schema({
    driver_license_no: {
        type: String,
        trim: true,
        required: [true, 'Driver driving license no. required']
    },
    vehicle_registration_no: {
        type: String,
        trim: true,
        required: [true, 'Vehicle registration no. required']
    },
    date: {
        type: Date,
        required: [true, 'Fine date is required']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    fine_details: [{
        rule: String,
        type: {
            type: String,
            enum: ['Vehicle', 'Driver']
        },
        fine: Number,
    }]
});

module.exports = mongoose.model('fine', fineSchema);