const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const hospitalSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Hospital ID required']
    },
    password: {
        type: String,
        required: true,
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
    reports: [{
        type: String,
        unique: true,
        trim: true,
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

hospitalSchema.pre('save', function(next) {
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

hospitalSchema.methods.toJSON = function() {
    return _.omit(this.toObject(), ['password', 'tokens']);
}

hospitalSchema.methods.authenticate = function(password, fn) {
    bcrypt.compare(password, this.password, fn);
}

hospitalSchema.methods.setPassword = function(password, fn) {
    this.password = password;
    this.save(fn);
}

hospitalSchema.methods.generateAuthToken = function(fn) {
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

hospitalSchema.statics.findByAuthToken = function(token, fn) {
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

module.exports = mongoose.model('hospital', hospitalSchema);