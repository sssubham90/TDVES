let officerController = require("../controller/officerController");

module.exports = (APP) => {

    APP.route('/api/officer/login')
        .post(officerController.login);
    APP.route('/api/officer/changePassword')
        .put(officerController.changePassword);
    APP.route('/api/officer/emergency')
        .post(officerController.emergency);
    APP.route('/api/officer/vehicleDetails')
        .get(officerController.vehicleDetails);
    APP.route('/api/officer/chargeChallan')
        .post(officerController.chargeChallan);

};