let driverController = {};
let Driver = require('../models/driver.model');
let Vehicle = require('../models/vehicle.model');
let Report = require('../models/report.model');
let Request = require('../models/request.model');

driverController.login = (REQUEST, RESPONSE) => {
    var license_no = REQUEST.query.license_no;
    Driver.findOne({
            license_no
        },
        function(err, driver) {
            if (err) {
                RESPONSE.send(err);
            } else if (driver) {
                driver.sendOtp((error, data) => {
                    RESPONSE.send(data);
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
            license_no
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
        else if (driver) {
            Vehicle.findOne({
                registration_no,
                chasis_number
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else if (vehicle) {
                    if (vehicle.owner_license_no == null)
                        vehicle.addOwner(driver.license_no, driver.name, (error, vehicle) => {
                            if (error) RESPONSE.send(error);
                            else if (vehicle) {
                                driver.addVehicle(registration_no, (error, driver) => {
                                    if (error) RESPONSE.send(error);
                                    else RESPONSE.send(driver);
                                });
                            }
                        });
                    else RESPONSE.send({
                        'error': 'Owner already exists'
                    });
                } else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
};
driverController.removeVehicle = (REQUEST, RESPONSE) => {
    var registration_no = REQUEST.query.registration_no;
    var chasis_number = REQUEST.query.chasis_number;
    var token = REQUEST.header('x-auth');
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Vehicle.findOne({
                registration_no,
                chasis_number
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else if (vehicle) {
                    if (vehicle.owner_license_no == driver.license_no)
                        vehicle.removeOwner((error, vehicle) => {
                            if (error) RESPONSE.send(error);
                            else if (vehicle) {
                                driver.removeVehicle(registration_no, (error, driver) => {
                                    if (error) RESPONSE.send(error);
                                    else RESPONSE.send(driver);
                                });
                            }
                        });
                    else RESPONSE.send({
                        'error': 'You are not authorized to make this change.'
                    });
                } else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            })
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
};
driverController.details = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            RESPONSE.send(driver);
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
};
driverController.modifyMedical = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var medical = REQUEST.body.medical;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            driver.medical = medical;
            driver.save((error, driver, numbersAffected) => {
                if (error) RESPONSE.send(error);
                else RESPONSE.send(driver);
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
};
driverController.sos = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var long = REQUEST.body.location_of_accident.long;
    var lat = REQUEST.body.location_of_accident.lat;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
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
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
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
                        } else RESPONSE.send({
                            'error': 'Victim not found'
                        });
                    });
                } else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            })
        } else RESPONSE.send({
            'error': 'Reporter not found'
        });
    });
};

driverController.listVehicles = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Vehicle.find({
                'registration_no': {
                    $in: driver.vehicles
                }
            }, (error, vehicles) => {
                if (error) RESPONSE.send(error);
                else if (vehicles) RESPONSE.send(vehicles);
                else RESPONSE.send({
                    'error': 'Vehicles not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
}
driverController.listVehicleRequest = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Request.find({
                owner_license_no: driver.license_no
            }, (error, requests) => {
                if (error) RESPONSE.send(error);
                else if (requests) RESPONSE.send(requests);
                else RESPONSE.send({
                    'error': 'No requests found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
}
driverController.sendVehicleRequest = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var registration_no = REQUEST.query.registration_no;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Vehicle.findOne({
                registration_no
            }, (error, vehicle) => {
                if (error) RESPONSE.send(error);
                else if (vehicle) {
                    var request = new Request({
                        owner_license_no: vehicle.owner_license_no,
                        driver_license_no: driver.license_no,
                        vehicle_registration_no: registration_no,
                        date: Date.now()
                    });
                    request.save((error, request) => {
                        if (error) RESPONSE.send(error);
                        else RESPONSE.send(request);
                    });
                } else RESPONSE.send({
                    'error': 'Vehicle not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
}
driverController.acceptVehicleRequest = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var id = REQUEST.query.id;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Request.findById(id, (error, request) => {
                if (error) RESPONSE.send(error);
                else if (request) {
                    if (request.status == null) {
                        request.status = 'Accepted';
                        var registration_no = request.vehicle_registration_no;
                        Vehicle.findOne({
                            registration_no
                        }, (error, vehicle) => {
                            if (error) RESPONSE.send(error);
                            else if (vehicle) {
                                vehicle.driver_license_no = request.driver_license_no;
                                vehicle.save((error, vehicle) => {
                                    if (error) RESPONSE.send(error);
                                    else if (vehicle) request.save((error, request) => {
                                        if (error) RESPONSE.send(error);
                                        else RESPONSE.send(request);
                                    });
                                });
                            } else RESPONSE.send({
                                'error': 'Vehicle not found'
                            });
                        });
                    } else RESPONSE.send({
                        'error': 'Illegal request status transition'
                    });
                } else RESPONSE.send({
                    'error': 'Request not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
}
driverController.rejectVehicleRequest = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var id = REQUEST.query.id;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Request.findById(id, (error, request) => {
                if (error) RESPONSE.send(error);
                else if (request) {
                    if (request.status == null) {
                        request.status = 'Rejected';
                        request.save((error, request) => {
                            if (error) RESPONSE.send(error);
                            else RESPONSE.send(request);
                        });
                    } else RESPONSE.send({
                        'error': 'Illegal request status transition'
                    });
                } else RESPONSE.send({
                    'error': 'Request not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
}
driverController.cancelVehicleLending = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var id = REQUEST.query.id;
    Driver.findByAuthToken(token, (error, driver) => {
        if (error) RESPONSE.send(error);
        else if (driver) {
            Request.findById(id, (error, request) => {
                if (error) RESPONSE.send(error);
                else if (request) {
                    if (request.status == 'Accepted') {
                        request.status = 'Canceled';
                        var registration_no = request.vehicle_registration_no;
                        Vehicle.findOne({
                            registration_no
                        }, (error, vehicle) => {
                            if (error) RESPONSE.send(error);
                            else if (vehicle) {
                                vehicle.driver_license_no = null;
                                vehicle.save((error, vehicle) => {
                                    if (error) RESPONSE.send(error);
                                    else if (vehicle) request.save((error, request) => {
                                        if (error) RESPONSE.send(error);
                                        else RESPONSE.send(request);
                                    });
                                });
                            } else RESPONSE.send({
                                'error': 'Vehicle not found'
                            });
                        });
                    } else RESPONSE.send({
                        'error': 'Illegal request status transition'
                    });
                } else RESPONSE.send({
                    'error': 'Request not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Driver not found'
        });
    });
}

module.exports = driverController;