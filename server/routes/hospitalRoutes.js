let hospitalController = require("../controller/hospitalController");

module.exports = (APP) => {

    APP.route('/api/hospital/login')
        .get(hospitalController.login);
    APP.route('/api/hospital/changePassword')
        .put(hospitalController.changePassword);
    APP.route('/api/hospital/emergency')
        .get(hospitalController.emergency);
    APP.route('/api/hospital/confirmEmergency')
        .put(hospitalController.confirmEmergency);

};