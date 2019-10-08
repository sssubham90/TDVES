const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    license_no: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'License no. required']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Driver name required']
    },
    valid_from: {
        type: Date,
        required: [true, 'Date of issue required']
    },
    valid_till: {
        type: Date,
        required: [true, 'Date of issue required']
    },
    class_of_vehicle: {
        type: String,
        enum: ["MC 50CC", "MCWOG/FVG", "LMV-NT", "MC EX50CC", "M/CYCL.WG", "MGV", "LMV", "HMV", "HGMV", "HPMV/HTV", "Trailer"],
        required: [true, 'Class of vehicle required']
    },
    issuing_authority: {
        type: String,
        trim: true,
        required: [true, 'Issuing authority required']
    },
});

module.exports = mongoose.model('license', licenseSchema);