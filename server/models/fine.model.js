const mongoose = require('mongoose');
const fineDetailModel = require('./fine_detail.model');
const fineDetailSchema = fineDetailModel.schema;

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
        fineDetailSchema
    }]
});

module.exports = mongoose.model('fine', fineSchema);