let hospitalController = require("../controller/hospitalController");

module.exports = (APP) => {
    APP.route('/api/hospital/login')
        .post(hospitalController.login);
    APP.route('/api/hospital/changePassword')
        .put(hospitalController.changePassword);
    APP.route('/api/hospital/emergency')
        .get(hospitalController.emergency);
    APP.route('/api/hospital/confirmEmergency')
        .get(hospitalController.confirmEmergency);
    APP.route('/api/hospital/hospitalEmergency')
        .get(hospitalController.hospitalEmergency);

};