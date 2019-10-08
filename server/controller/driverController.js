let driverController = {};
let Driver = require("../models/driver.model");
let Vehicle = require("../models/vehicle.model");
let Report = require("../models/report.model");

driverController.login = (REQUEST, RESPONSE) => {
    var license_no = REQUEST.query.license_no;
    Driver.findOne({
            license_no: license_no
        },
        function(err, driver) {
            if (err) {
                RESPONSE.send(err);
            } else if (driver) {
                driver.sendOtp((error, driver) => {
                    RESPONSE.send(driver);
                });
            } else {
                RESPONSE.send({
                    'error': 'Driver not found'
                });
            }
        });
};
driverController.verifyOTP = (REQUEST, RESPONSE) => {
    var license_no = REQUEST.query.license_no;
    var otp = REQUEST.query.otp;
    Driver.findOne({
            license_no: license_no
        },
        function(err, driver) {
            if (err) {
                RESPONSE.send(err);
            } else if (driver) {
                driver.verifyOtp(otp, (error, data) => {
                    if (data.type == 'success' || true) {
                        console.log(data);
                        driver.generateAuthToken((err, driver, token) => {
                            if (err) RESPONSE.send(err);
                            else RESPONSE.header('x-auth', token).send(driver);
                        });
                    }
                });
            } else {
                RESPONSE.send({
                    'error': 'Driver not found'
                });
            }
        });
};
driverController.addVehicle = (REQUEST, RESPONSE) => {
    var registration_no = REQUEST.query.registration_no;
    var chasis_number = REQUEST.query.chasis_number;
    var token = REQUEST.header('x-auth');
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else {
            var owner_license_no = driver.license_no;
            Vehicle.findOne({
                registration_no,
                chasis_number
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else {
                    vehicle.addOwner(owner_license_no, (error, doc) => {
                        if (error) RESPONSE.send(error);
                        else RESPONSE.send(doc);
                    });
                }
            })
        }
    });
};
driverController.details = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else {
            RESPONSE.send(driver);
        }
    });
};
driverController.modifyMedical = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var medical = REQUEST.body.medical;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else {
            driver.medical = medical;
            driver.save((error, driver, numbersAffected) => {
                if (error) RESPONSE.send(error);
                else RESPONSE.send(driver);
            });
        }
    });
};
driverController.sos = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var long = REQUEST.body.location_of_accident.long;
    var lat = REQUEST.body.location_of_accident.lat;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else {
            var report = new Report({
                date: Date.now(),
                reporter: {
                    license_no: driver.license_no,
                    description: 'SOS'
                },
                victim: {
                    license_no: driver.license_no,
                    name: driver.name,
                    gender: driver.gender,
                    dob: driver.dob,
                    phone: driver.phone,
                    email: driver.email,
                    address: driver.address,
                    medical: driver.medical,
                    insurance: driver.insurance,
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
        }
    });
};
driverController.emergency = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var long = REQUEST.body.location_of_accident.long;
    var lat = REQUEST.body.location_of_accident.lat;
    var registration_no = REQUEST.body.registration_no;
    var description = REQUEST.body.description;
    Driver.findByAuthToken(token, (error, reporter) => {
        if (error) RESPONSE.send(error);
        else {
            Vehicle.findOne({
                registration_no: registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else {
                    Driver.findOne({
                        license_no: vehicle.driver_license_no || vehicle.owner_license_no
                    }, (error, victim) => {
                        if (error) RESPONSE.send(error);
                        else {
                            var report = new Report({
                                date: Date.now(),
                                reporter: {
                                    license_no: reporter.license_no,
                                    description: description
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
                        }
                    });
                }
            })
        }
    });
};

module.exports = driverController;