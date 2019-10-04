let officerController = require("../controller/officerController");
let auth = require("../util/authOfficer");

module.exports = (APP) => {

    APP.route('/api/driver/login')
        .get(officerController.login);
    APP.route('/api/driver/verifyOTP')
        .get(officerController.verifyOTP);
    APP.route('/api/officer/emergency')
        .post(officerController.emergency);
    APP.route('/api/officer/vehicleDetails')
        .get(officerController.vehicleDetails);
    APP.route('/api/officer/chargeChallan')
        .post(officerController.chargeChallan);

};