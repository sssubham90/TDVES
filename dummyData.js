let Driver = require("./server/models/driver.model");
let Officer = require("./server/models/officer.model");
let Hospital = require("./server/models/hospital.model");
let Vehicle = require("./server/models/vehicle.model");
let License = require("./server/models/license.model");
let Reports = require("./server/models/reports.model");
let Fine = require("./server/models/fine.model");

let create = () => {
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
        dob: new Date("1978-01-31"),
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
    /*
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
    */

    //Licence
    License.create({
        licence_no: '1234567',
        name: 'Zaehman Khan',
        valid_from: new Date("2007-12-31"),
        valid_till: new Date("2027-12-30"),
        class_of_vehicle: "LMV",
        issuing_authority: "Indian Union Driving Licence"
    });
    License.create({
        licence_no: '1774567',
        name: "Sehnab Das",
        valid_from: new Date("1999-01-31"),
        valid_till: new Date("2019-01-30"),
        class_of_vehicle: "LMV",
        issuing_authority: "Indian Union Driving Licence"
    });

    //Officer
    Officer.create({
        id: "124",
        password: "abcd",
        location: {
            type: "Point",
            coordinates: [
                93.47,
                98.52
            ]
        },
    });

    //Hospital
    Hospital.create({
        id: "H1",
        location: {
            type: "Point",
            coordinates: [
                94.67,
                98.72
            ]
        },

    });

    //Vechile
    Vehicle.create({
        registration_no: "OD33Q1234",
        class_of_vehicle: "LMV",
        manufacturer: "SUZUKI",
        owner_name: "Zaehman Khan",
        seating_capacity: 4,
        cubic_capacity: 999,
        color: "Grey",
        chasis_number: "MA6MFBC1BBT096358",
        engine_number: "52WVC10338",
        pucc: {
            serial_no: "453",
            date_of_issue: new Date("2019-5-1"),
            date_of_expiry: new Date("2019-11-30"),
            certifying_authority: "KK pollution testing Centre"
        },
        insurance: {
            insurance_no: "07629534",
            date_of_expiry: new Date("2019-11-30"),
            insurer: "ICIC"
        }
    });

};

module.exports = {
    create: create
};