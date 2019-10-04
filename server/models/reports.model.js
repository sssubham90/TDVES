const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Report ID required']
    },
    reporter: {
        licence_no: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Driver driving licence no. required']
        },
        description: {
            type: String,
            trim: true,
            default: null
        }
    },
    victim: {
        licence_no: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Driver driving licence no. required']
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
                    return /\d{3}-\d{3}-\d{4}/.test(v);
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
    }
});

module.exports = mongoose.model('hospital', hospitalSchema);