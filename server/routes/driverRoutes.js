let CONTROLLER = require("../controller/driverController");
let auth = require("../../util/auth");

module.exports = (APP) => {

    APP.route('/api/driver/login')
        .get(CONTROLLER.driverController.login);
    APP.route('/api/driver/verifyOTP')
        .get(CONTROLLER.driverController.verifyOTP);
    APP.route('/api/driver/addVehicle')
        .post(CONTROLLER.driverController.addVehicle);
    APP.route('/api/driver/details')
        .get(CONTROLLER.driverController.details);
    APP.route('/api/driver/modifyMedical')
        .put(CONTROLLER.driverController.modifyMedical);
    APP.route('/api/driver/sos')
        .post(CONTROLLER.driverController.sos);
    APP.route('/api/driver/emergency')
        .post(CONTROLLER.driverController.emergency);
};