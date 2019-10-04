let CONTROLLER = require("../controller/officerController");
let auth = require("../../util/auth");

module.exports = (APP) => {

    APP.route('/api/driver/login')
        .get(CONTROLLER.officerController.login);
    APP.route('/api/driver/verifyOTP')
        .get(CONTROLLER.driverController.verifyOTP);
    APP.route('/api/officer/emergency')
        .post(CONTROLLER.officerController.emergency);
    APP.route('/api/officer/vehicleDetails')
        .get(CONTROLLER.officerController.vehicleDetails);
    APP.route('/api/officer/chargeChallan')
        .post(CONTROLLER.officerController.chargeChallan);

};