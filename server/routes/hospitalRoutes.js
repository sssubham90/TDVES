let CONTROLLER = require("../controller/hospitalController");
let auth = require("../../util/auth");

module.exports = (APP) => {

    APP.route('/api/hospital/login')
        .get(CONTROLLER.hospitalController.login);
    APP.route('/api/hospital/emergencies')
        .get(CONTROLLER.hospitalController.emergencies);
    APP.route('/api/hospital/confirmEmergency')
        .get(CONTROLLER.hospitalController.confirmEmergency);

};