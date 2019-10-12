let hospitalController = {};
let Hospital = require('../models/hospital.model');
let Report = require('../models/report.model');

hospitalController.login = (REQUEST, RESPONSE) => {
    var id = REQUEST.body.id;
    var password = REQUEST.body.password;
    Hospital.findOne({
        id
    }, (error, hospital) => {
        if (error) RESPONSE.send(error);
        else if (hospital) {
            hospital.authenticate(password, (error, result) => {
                if (error) RESPONSE.send(error);
                else if (result == true) {
                    hospital.generateAuthToken((err, hospital, token) => {
                        if (err) RESPONSE.send(err);
                        else RESPONSE.header('x-auth', token).send(hospital);
                    });
                } else RESPONSE.send({
                    'msg': 'Incorrect Password'
                });
            });
        } else RESPONSE.send({
            'error': 'Hospital not found'
        });
    });
};

hospitalController.changePassword = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var oldPassword = REQUEST.body.oldPassword;
    var newPassword = REQUEST.body.newPassword;
    Hospital.findByAuthToken(token, (error, hospital) => {
        if (error) RESPONSE.send(error);
        else if (hospital) {
            hospital.authenticate(oldPassword, (error, result) => {
                if (error) RESPONSE.send(error);
                else if (result == true) {
                    hospital.setPassword(newPassword, (error, hospital, numbersAffected) => {
                        if (error) RESPONSE.send(error);
                        else RESPONSE.send({
                            'msg': 'Password changed successfully',
                            hospital
                        });
                    });
                } else RESPONSE.send({
                    'msg': 'Incorrect Password'
                });
            });
        } else RESPONSE.send({
            'error': 'Hospital not found'
        });
    });
};

hospitalController.emergency = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    Hospital.findByAuthToken(token, (error, hospital) => {
        if (error) RESPONSE.send(error);
        else if (hospital) {
            Report.find({
                location_of_accident: {
                    $near: {
                        $maxDistance: 1000, //in metres
                        $geometry: {
                            type: hospital.location.type,
                            coordinates: hospital.location.coordinates
                        }
                    }
                },
                'hospital.id': null
            }, (error, results) => {
                if (error) RESPONSE.send(error);
                else RESPONSE.send((results));
            });
        } else RESPONSE.send({
            'error': 'Hospital not found'
        });
    });
};

hospitalController.confirmEmergency = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    var report_id = REQUEST.query.report_id;
    Hospital.findByAuthToken(token, (error, hospital) => {
        if (error) RESPONSE.send(error);
        else if (hospital) {
            Report.findById(report_id, (error, report) => {
                if (error) RESPONSE.send(error);
                else if (report) {
                    if (report.hospital.id == null) {
                        report.hospital.id = hospital.id;
                        report.hospital.location = hospital.location;
                        report.save((error, report, numbersAffected) => {
                            if (error) RESPONSE.send(error);
                            else RESPONSE.send(report);
                        });
                    } else RESPONSE.send({
                        'error': 'Report has already been confirmed.'
                    });
                } else RESPONSE.send({
                    'error': 'Report not found'
                });
            });
        } else RESPONSE.send({
            'error': 'Hospital not found'
        });
    });
};

hospitalController.hospitalEmergency = (REQUEST, RESPONSE) => {
    var token = REQUEST.header('x-auth');
    Hospital.findByAuthToken(token, (error, hospital) => {
        if (error) RESPONSE.send(error);
        else if (hospital) {
            Report.find({
                'hospital.id': hospital.id
            }, (error, results) => {
                if (error) RESPONSE.send(error);
                else RESPONSE.send((results));
            });
        } else RESPONSE.send({
            'error': 'Hospital not found'
        });
    });
};

module.exports = hospitalController;