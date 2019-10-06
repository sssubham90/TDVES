const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({

    driver_licence_no: {
        type: String,
        trim: true,
        required: [true, 'Driver driving licence no. required']
    },
    vehicle_registration_no: {
        type: String,
        trim: true,
        required: [true, 'Vehicle registration no. required']
    },
    type: {
        type: String,
        enum: ["driver", "vehicle"],
        required: [true, 'Fine type required']
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
        fine_amt: Number
    }]
});

module.exports = mongoose.model('fine', fineSchema);