let driverController = require("../controller/driverController");

module.exports = (APP) => {

    APP.route('/api/driver/login')
        .get(driverController.login);
    APP.route('/api/driver/verifyOTP')
        .get(driverController.verifyOTP);
    APP.route('/api/driver/addVehicle')
        .post(driverController.addVehicle);
    APP.route('/api/driver/removeVehicle')
        .delete(driverController.removeVehicle);
    APP.route('/api/driver/details')
        .get(driverController.details);
    APP.route('/api/driver/modifyMedical')
        .put(driverController.modifyMedical);
    APP.route('/api/driver/sos')
        .post(driverController.sos);
    APP.route('/api/driver/emergency')
        .post(driverController.emergency);
    APP.route('/api/driver/listVehicles')
        .get(driverController.listVehicles);
    APP.route('/api/driver/listVehicleRequest')
        .get(driverController.listVehicleRequest);
    APP.route('/api/driver/sendVehicleRequest')
        .post(driverController.sendVehicleRequest);
    APP.route('/api/driver/acceptVehicleRequest')
        .put(driverController.acceptVehicleRequest);
    APP.route('/api/driver/rejectVehicleRequest')
        .put(driverController.rejectVehicleRequest);
    APP.route('/api/driver/cancelVehicleLending')
        .put(driverController.cancelVehicleLending);
};