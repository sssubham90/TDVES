let officerController = {};
let Officer = require('../models/officer.model');
let Driver = require('../models/driver.model');
let Vehicle = require('../models/vehicle.model');
let Report = require('../models/report.model');
let Fine = require('../models/fine.model');
let geolocation = require('geolocation-utils');

officerController.login = (REQUEST, RESPONSE) => {
    var id = REQUEST.body.id;
    var password = REQUEST.body.password;
    Officer.findOne({
        id
    }, (error, officer) => {
        if (error) RESPONSE.status(500).send({
            'error': error
        });
        else if (officer) {
            officer.authenticate(password, (error, result) => {
                if (error) RESPONSE.status(500).send({
                    'error': error
                });
                else if (result == true) {
                    officer.generateAuthToken((error, officer, token) => {
                        if (err) RESPONSE.status(500).send({
                            'error': error
                        });
                        else RESPONSE.status(200).header('x-auth', token).send({
                            'msg': officer
                        });
                    });
                } else RESPONSE.status(400).send({
                    'msg': 'Incorrect Password'
                });
            });
        } else RESPONSE.status(400).send({
            'error': 'Officer not found'
        });
    });
};
officerController.changePassword = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var oldPassword = REQUEST.body.oldPassword;
    var newPassword = REQUEST.body.newPassword;
    Officer.findByAuthToken(token, (error, officer) => {
        if (error) RESPONSE.status(500).send({
            'error': error
        });
        else if (officer) {
            officer.authenticate(oldPassword, (error, result) => {
                if (error) RESPONSE.status(500).send({
                    'error': error
                });
                else if (result == true) {
                    officer.setPassword(newPassword, (error, officer) => {
                        if (error) RESPONSE.status(500).send({
                            'error': error
                        });
                        else RESPONSE.status(200).send({
                            'msg': 'Password changed successfully',
                            officer
                        });
                    });
                } else RESPONSE.status(400).send({
                    'msg': 'Incorrect Password'
                });
            });
        } else RESPONSE.status(400).send({
            'error': 'Officer not found'
        });
    });
};
officerController.emergency = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var long = REQUEST.body.location_of_accident.long;
    var lat = REQUEST.body.location_of_accident.lat;
    var registration_no = REQUEST.body.registration_no;
    var description = REQUEST.body.description;
    Officer.findByAuthToken(token, (error, reporter) => {
        if (error) RESPONSE.status(500).send({
            'error': error
        });
        else if (reporter) {
            Vehicle.findOne({
                registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.status(500).send({
                    'error': error
                });
                else if (vehicle) {
                    Driver.findOne({
                        license_no: vehicle.driver_license_no || vehicle.owner_license_no
                    }, (error, victim) => {
                        if (error) RESPONSE.status(500).send({
                            'error': error
                        });
                        else if (victim) {
                            var report = new Report({
                                date: Date.now(),
                                reporter: {
                                    license_no: reporter.id,
                                    description: `Reported by an Officer. ${description}`
                                },
                                victim: {
                                    license_no: victim.license_no,
                                    name: victim.name,
                                    gender: victim.gender,
                                    dob: victim.dob,
                                    phone: victim.phone,
                                    email: victim.email,
                                    address: victim.address,
                                    medical: victim.medical,
                                    insurance: victim.insurance,
                                },
                                location_of_accident: {
                                    type: "Point",
                                    coordinates: [
                                        long,
                                        lat
                                    ]
                                },
                            });
                            report.save((error, report) => {
                                if (error) RESPONSE.status(500).send({
                                    'error': error
                                });
                                else RESPONSE.status(200).send({
                                    'msg': report
                                });
                            });
                        } else RESPONSE.status(400).send({
                            'error': 'Victim not found'
                        });
                    });
                } else RESPONSE.status(400).send({
                    'error': 'Vehicle not found'
                });
            });
        } else RESPONSE.status(400).send({
            'error': 'Reporter not found'
        });
    });
};
officerController.vehicleDetails = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var registration_no = REQUEST.query.registration_no;
    Officer.findByAuthToken(token, (error, officer) => {
        if (error) RESPONSE.status(500).send({
            'error': error
        });
        else if (officer) {
            Vehicle.findOne({
                registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.status(500).send({
                    'error': error
                });
                else if (vehicle) RESPONSE.status(200).send({
                    'msg': vehicle
                });
                else RESPONSE.status(400).send({
                    'error': 'Vehicle not found'
                });
            })
        } else RESPONSE.status(400).send({
            'error': 'Officer not found'
        });
    });

};
officerController.listFines = (REQUEST, RESPONSE) => {
    RESPONSE.status(200).send({
        'msg': [{
                rule: "Driving without helmet",
                fine: 2000
            },
            {
                rule: "Driving without wearing seat belt",
                fine: 1000
            },
            {
                rule: "Drunken Driving",
                fine: 10000
            },
            {
                rule: "Driving without license",
                fine: 5000
            },
            {
                rule: "Overspeeding",
                fine: 500
            },
            {
                rule: "Invalid license",
                fine: 2000
            },
            {
                rule: "Diving without PUC certificate or with invalid PUC certificate",
                fine: 1000
            },
            {
                rule: "Diving without insurance or with invalid insurance",
                fine: 1500
            }
        ]
    });
}
officerController.chargeChallan = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var vehicle_registration_no = REQUEST.body.vehicle_registration_no;
    var long = REQUEST.body.location.long;
    var lat = REQUEST.body.location.lat;
    var fine_details = REQUEST.body.fine_details;
    var date = Date.now();
    Officer.findByAuthToken(token, (error, officer) => {
        if (error) RESPONSE.status(500).send({
            'error': error
        });
        else if (officer) {
            Vehicle.findOne({
                registration_no: vehicle_registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.status(500).send({
                    'error': error
                });
                else if (vehicle) {
                    var driver_license_no = vehicle.driver_license_no || vehicle.owner_license_no;
                    if (geolocation.distanceTo(officer.location.coordinates, [long, lat]) < 100) {
                        var fine = new Fine({
                            driver_license_no,
                            vehicle_registration_no,
                            date,
                            location: {
                                type: "Point",
                                coordinates: [
                                    long,
                                    lat
                                ]
                            },
                            fine_details
                        });
                        fine.save((error, fine) => {
                            if (error) RESPONSE.status(500).send({
                                'error': error
                            });
                            else RESPONSE.status(200).send({
                                'msg': fine
                            });
                        });
                    } else RESPONSE.status(400).send({
                        'error': 'Officer out of duty area...'
                    });
                } else RESPONSE.status(400).send({
                    'error': 'Vehicle not found'
                });
            });
        } else RESPONSE.status(400).send({
            'error': 'Officer not found'
        });
    });
};


module.exports = officerController;