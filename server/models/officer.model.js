const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
        required: [true, 'Password is required'],
        minlength: 6
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

officerSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) console.log(error);
            else bcrypt.hash(this.password, salt, (error, hash) => {
                if (error) console.log(error);
                else {
                    this.password = hash;
                    next();
                }
            })
        })
    } else next();
})

officerSchema.methods.authenticate = function(password, fn) {
    bcrypt.compare(password, this.password, fn);
}

officerSchema.methods.setPassword = function(password, fn) {
    this.password = password;
    this.token
    this.save(fn);
}

officerSchema.methods.generateAuthToken = function(fn) {
    var access = 'auth';
    var token = jwt.sign({
        _id: this._id.toHexString(),
        access
    }, 'devil');
    this.tokens.push({
        access,
        token
    });
    this.save(function(err, doc) {
        fn(err, doc, token);
    });
}

officerSchema.methods.toJSON = function() {
    return _.omit(this.toObject(), ['password', 'tokens']);
}

officerSchema.statics.findByAuthToken = function(token, fn) {
    var decoded;
    try {
        decoded = jwt.verify(token, 'devil');
    } catch (e) {
        fn(e, null);
    }

    this.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }, fn);
}

module.exports = mongoose.model('officer', officerSchema);