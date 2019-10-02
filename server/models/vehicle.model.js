import {
    fineSchema
} from './fine.model'
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    registration_no: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Registration no. required']
    },
    class_of_vehicle: {
        type: String,
        enum: ["MC 50CC", "MCWOG/FVG", "LMV-NT", "MC EX50CC", "M/CYCL.WG", "MGV", "LMV", "HMV", "HGMV", "HPMV/HTV", "Trailer"],
        required: [true, 'Class of vehicle required']
    },
    manufacturer: {
        type: String,
        trim: true,
        required: [true, 'Manufacturer name required'],
    },
    owner_name: {
        type: String,
        trim: true,
        required: [true, 'Owner\'s name required']
    },
    owner_license_no: {
        type: String,
        trim: true,
        default: null
    },
    driver_license_no: {
        type: String,
        trim: true,
        default: null
    },
    seating_capacity: {
        type: Number,
        required: [true, 'Seating Capacity required']
    },
    cubic_capacity: {
        type: Number,
        required: [true, 'Cubic Capacity required']
    },
    color: {
        type: String,
        trim: true,
        required: [true, 'Vehicle Color required']
    },
    chasis_number: {
        type: String,
        trim: true,
        required: [true, 'Chasis Number required']
    },
    engine_number: {
        type: String,
        trim: true,
        required: [true, 'Engine Number required']
    },
    pucc: {
        seriel_no: {
            type: String,
            trim: true,
            required: [true, 'PUC Certificate Seriel Number required']
        },
        date_of_issue: {
            type: Date,
            required: [true, 'PUC Certificate Issue Date is required']
        },
        date_of_expiry: {
            type: Date,
            required: [true, 'PUC Certificate Expiry Date is required']
        },
        certifying_authority: {
            type: String,
            trim: true,
            required: [true, 'PUC Certificate Certifying Authority required']
        }
    },
    insurance: {
        insurance_no: {
            type: String,
            trim: true,
            required: [true, 'Insurance Number is required']
        },
        date_of_expiry: {
            type: Date,
            required: [true, 'Insurance Expiry Date is required']
        },
        insurer: {
            type: String,
            trim: true,
            required: [true, 'Insurance Service Provider is required']
        }
    },
    fines: [{
        type: fineSchema
    }]
});

module.exports = mongoose.model('vehicle', vehicleSchema);