const mongoose = require('mongoose');
const fineModel = require('./fine.model');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const sendOtp = require('../services/OTPService');

const fineSchema = fineModel.schema;

const driverSchema = new mongoose.Schema({
    license_no: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Driver driving license no. required']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Driver name required']
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: [true, 'Driver gender required']
    },
    dob: {
        type: Date,
        required: [true, 'Driver date of birth required']
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Driver phone number required']
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email id!`
        },
        required: [true, 'Driver email required']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Driver address required']
    },
    medical: {
        blood_group: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            required: [true, 'Driver blood group required']
        },
        glucose: {
            test_date: Date,
            value: Number
        },
        potassium: {
            test_date: Date,
            value: Number
        },
        cbc: {
            test_date: Date,
            value: Number
        },
        pt: {
            test_date: Date,
            value: Number
        },
        ptt: {
            test_date: Date,
            value: Number
        }
    },
    fines: [{
        type: fineSchema
    }],
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

driverSchema.methods.generateAuthToken = function(fn) {
    var access = 'auth';
    var token = jwt.sign({
        _id: this._id.toHexString(),
        access
    }, 'devil');
    this.tokens.push({
        access,
        token
    });
    this.save(function(err, doc, numbersAffected) {
        fn(err, doc, token);
    });
}

driverSchema.methods.toJSON = function() {
    return _.omit(this.toObject(), ['tokens']);
}

driverSchema.methods.sendOtp = function(fn) {
    sendOtp.send(this.phone, "TDVES", fn);
}

driverSchema.methods.verifyOtp = function(otp, fn) {
    sendOtp.verify(this.phone, otp, fn);
}

driverSchema.statics.findByAuthToken = (token, fn) => {
    var decoded;
    var Driver = mongoose.model('driver', driverSchema);
    try {
        decoded = jwt.verify(token, 'devil');
    } catch (e) {
        fn(e, null);
    }

    Driver.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }, fn);
}

module.exports = mongoose.model('driver', driverSchema);