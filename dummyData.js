let Driver = require("./server/models/driver.model");
let Officer = require("./server/models/officer.model");
let Hospital = require("./server/models/hospital.model");
let Vehicle = require("./server/models/vehicle.model");
let License = require("./server/models/license.model");
let Reports = require("./server/models/reports.model");
let Fine = require("./server/models/fine.model");
let FineDetail = require("./server/models/fine_detail.model");

Driver.create({
    licence_no: '1234567'
}, function(err, small) {
    if (err) console.log(err);
});