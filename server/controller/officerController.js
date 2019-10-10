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
        if (error) RESPONSE.send(error);
        else if (officer) {
            officer.authenticate(password, (error, result) => {
                if (error) RESPONSE.send(error);
                else if (result == true) {
                    officer.generateAuthToken((err, officer, token) => {
                        if (err) RESPONSE.send(err);
                        else RESPONSE.header('x-auth', token).send(officer);
                    });
                } else RESPONSE.send({
                    'msg': 'Incorrect Password'
                });
            });
        } else RESPONSE.send({
            'error': 'Officer not found'
        });
    });
};
officerController.changePassword = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var oldPassword = REQUEST.body.oldPassword;
    var newPassword = REQUEST.body.newPassword;
    Officer.findByAuthToken(token, (error, officer) => {
        if (error) RESPONSE.send(error);
        else if (officer) {
            officer.authenticate(oldPassword, (error, result) => {
                if (error) RESPONSE.send(error);
                else if (result == true) {
                    officer.setPassword(newPassword, (error, officer, numbersAffected) => {
                        if (error) RESPONSE.send(error);
                        else RESPONSE.send({
                            'msg': 'Password changed successfully',
                            officer
                        });
                    });
                } else RESPONSE.send({
                    'msg': 'Incorrect Password'
                });
            });
        } else RESPONSE.send({
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
        if (error) RESPONSE.send(error);
        else if (reporter) {
            Vehicle.findOne({
                registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else if (vehicle) {
                    Driver.findOne({
                        license_no: vehicle.driver_license_no || vehicle.owner_license_no
                    }, (error, victim) => {
                        if (error) RESPONSE.send(error);
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
                                if (error) RESPONSE.send(error);
                                else RESPONSE.send(report);
                            });
                        } else RESPONSE.send({
                            'error': 'Victim not found'
                        });
                    });
                } else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Reporter not found'
        });
    });
};
officerController.vehicleDetails = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var registration_no = REQUEST.query.registration_no;
    Officer.findByAuthToken(token, (error, officer) => {
        if (error) RESPONSE.send(error);
        else if (officer) {
            Vehicle.findOne({
                registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else if (vehicle) RESPONSE.send(vehicle);
                else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            })
        } else RESPONSE.send({
            'error': 'Officer not found'
        });
    });

};
officerController.chargeChallan = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var vehicle_registration_no = REQUEST.body.vehicle_registration_no;
    var long = REQUEST.body.location.long;
    var lat = REQUEST.body.location.lat;
    var fine_details = REQUEST.body.fine_details;
    var date = Date.now();
    Officer.findByAuthToken(token, (error, officer) => {
        if (error) RESPONSE.send(error);
        else if (officer) {
            Vehicle.findOne({
                registration_no: vehicle_registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
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
                            if (error) RESPONSE.send(fine);
                            else RESPONSE.send(fine);
                        });
                    } else RESPONSE.send({
                        'error': 'Officer out of duty area...'
                    });
                } else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Officer not found'
        });
    });
};


module.exports = officerController;