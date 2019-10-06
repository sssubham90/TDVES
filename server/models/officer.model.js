const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Officer ID is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required']
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
    tokens: [{
        type: String
    }]
});

module.exports = mongoose.model('officer', officerSchema);