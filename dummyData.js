let Driver = require("./server/models/driver.model");
let Officer = require("./server/models/officer.model");
let Hospital = require("./server/models/hospital.model");
let Vehicle = require("./server/models/vehicle.model");
let License = require("./server/models/license.model");
let Reports = require("./server/models/reports.model");
let Fine = require("./server/models/fine.model");
let FineDetail = require("./server/models/fine_detail.model");
// Driver
Driver.create({
    licence_no: '1234567',
    name: 'Zaehman Khan',
    gender: 'male',
    dob: new Date('1978-12-31'),
    phone: '9999445789',
    email: 'zaehman@gmail.com',
    address: 'Plot no: 271, Ramnagar, Patia, Bhubaneswar',
    medical: {
        blood_group: 'B+'
    }
}, function(err, small) {
    if (err) console.log(err);
});
Driver.create({
    licence_no: '1774567',
    name: "Sehnab Das",
    gender: "male",
    dob: new Date("1978-12-31"),
    phone: "9539785789",
    email: "zseh9151@gmail.com",
    address: "Plot no: 2, Kalinga Vihar, Patia, Bhubaneswar",
    medical: {
        blood_group: "B+"
    }
}, function(err, small) {
    if (err) console.log(err);
});


//FineDetail
FineDetail.create({
    rule: "Driving without helmet",
    fine: 2000
});
FineDetail.create({
    rule: "Drunken Driving",
    fine: 10000
});
FineDetail.create({
    rule: "Driving without license",
    fine: 5000
});
FineDetail.create({
    rule: "Overspeeding",
    fine: 500
});
FineDetail.create({
    rule: "Driving without wearing seat belt",
    fine: 1000
});
FineDetail.create({
    rule: "invalid license",
    fine: 2000
});
FineDetail.create({
    rule: "Diving without PUC certificate or with invalid PUC certificate",
    fine: 1000
});
FineDetail.create({
    rule: "Diving without insurance or with invalid insurance",
    fine: 1500
});
