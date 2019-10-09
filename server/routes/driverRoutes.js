let driverController = require("../controller/driverController");

module.exports = (APP) => {

    APP.route('/api/driver/login')
        .get(driverController.login);
    APP.route('/api/driver/verifyOTP')
        .get(driverController.verifyOTP);
    APP.route('/api/driver/addVehicle')
        .post(driverController.addVehicle);
    APP.route('/api/driver/details')
        .get(driverController.details);
    APP.route('/api/driver/modifyMedical')
        .put(driverController.modifyMedical);
    APP.route('/api/driver/sos')
        .post(driverController.sos);
    APP.route('/api/driver/emergency')
        .post(driverController.emergency);
};