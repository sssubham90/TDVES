let hospitalController = require("../controller/hospitalController");
let auth = require("../util/authHospital");

module.exports = (APP) => {

    APP.route('/api/hospital/login')
        .get(hospitalController.login);
    APP.route('/api/hospital/emergency')
        .get(hospitalController.emergency);
    APP.route('/api/hospital/confirmEmergency')
        .put(hospitalController.confirmEmergency);

};