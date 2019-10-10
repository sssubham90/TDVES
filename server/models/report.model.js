const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Driver date of birth required'],
    },
    reporter: {
        license_no: {
            type: String,
            trim: true,
            required: [true, 'Driver driving license no. required']
        },
        description: {
            type: String,
            trim: true,
            default: null
        }
    },
    victim: {
        license_no: {
            type: String,
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
        insurance: {
            insurance_no: {
                type: String,
                trim: true
            },
            date_of_expiry: {
                type: Date,
            },
            insurer: {
                type: String,
                trim: true
            }
        },
    },
    location_of_accident: {
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
    hospital: {
        id: {
            type: String,
            trim: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
            }
        },
    }
});

reportSchema.index({
    location_of_accident: "2dsphere"
});

module.exports = mongoose.model('report', reportSchema);