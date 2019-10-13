const mongoose = require('mongoose');
const fineModel = require('./fine.model');
const fineSchema = fineModel.schema;

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
        default: null
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
        serial_no: {
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

vehicleSchema.methods.addOwner = function(license_no, name, fn) {
    this.owner_license_no = license_no;
    this.owner_name = name;
    this.save(function(err, doc) {
        fn(err, doc);
    });
}

vehicleSchema.methods.removeOwner = function(fn) {
    this.owner_license_no = null;
    this.owner_name = null;
    this.save(function(err, doc) {
        fn(err, doc);
    });
}

module.exports = mongoose.model('vehicle', vehicleSchema);