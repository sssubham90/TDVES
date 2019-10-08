const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Hospital ID required']
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
    reports: [{
        type: String,
        unique: true,
        trim: true,
    }],
    tokens: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('hospital', hospitalSchema);