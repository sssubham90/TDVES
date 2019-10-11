const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    owner_license_no: {
        type: String,
        trim: true,
        required: [true, 'Owner driving license no. required']
    },
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
    status: {
        type: String,
        default: 'Initiated',
        enum: ['Initiated', 'Accepted', 'Rejected', 'Canceled']
    }
});

module.exports = mongoose.model('request', requestSchema);