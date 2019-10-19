let Driver = require("./server/models/driver.model");
let Officer = require("./server/models/officer.model");
let Hospital = require("./server/models/hospital.model");
let Vehicle = require("./server/models/vehicle.model");
let License = require("./server/models/license.model");
let Report = require("./server/models/report.model");
let Fine = require("./server/models/fine.model");

let create = () => {
    // Driver
    Driver.create({
        img_url: 'https://media.licdn.com/dms/image/C5603AQGfVj3yqa7lYA/profile-displayphoto-shrink_200_200/0?e=1576713600&v=beta&t=gdFZTq4NkDruXMVBhkUBiDm3ucD8ys91KpCB60Q55m0',
        license_no: '1234567',
        name: 'Zaehman Khan',
        gender: 'male',
        dob: new Date('1978-12-31'),
        phone: '7980391759',
        email: 'zaehman@gmail.com',
        address: 'Plot no: 271, Ramnagar, Patia, Bhubaneswar',
        medical: {
            blood_group: 'B+'
        }
    }, function(err, small) {
        if (err) console.log(err);
    });
    Driver.create({
        img_url: 'https://media.licdn.com/dms/image/C4E03AQGK4n5HPGuYKw/profile-displayphoto-shrink_800_800/0?e=1576713600&v=beta&t=iFKgpIs1dkWUMq2G6y_P2-ufnIEaXgagur2TiYW-HKw',
        license_no: '1774567',
        name: "Sehnab Das",
        gender: "male",
        dob: new Date("1978-01-31"),
        phone: "9178175969",
        email: "seh9151@gmail.com",
        address: "Plot no: 2, Kalinga Vihar, Patia, Bhubaneswar",
        medical: {
            blood_group: "B+"
        }
    }, function(err, small) {
        if (err) console.log(err);
    });

    Driver.create({
        img_url: 'https://media.licdn.com/dms/image/C5103AQEOAgeAPl4aUw/profile-displayphoto-shrink_200_200/0?e=1576713600&v=beta&t=59kBGAXrxWzWHl9_tfgZplrcaAlRwQxBxlLyViU9Ubo',
        license_no: '1784567',
        name: "Arnab Das",
        gender: "male",
        dob: new Date("1978-01-31"),
        phone: "7008048340",
        email: "arnab@gmail.com",
        address: "Plot no: 2, Nrangi Vihar, Patia, Bhubaneswar",
        medical: {
            blood_group: "B+"
        }
    }, function(err, small) {
        if (err) console.log(err);
    });


    //license
    License.create({
        license_no: '1234567',
        name: 'Zaehman Khan',
        valid_from: new Date("2007-12-31"),
        valid_till: new Date("2027-12-30"),
        class_of_vehicle: "LMV",
        issuing_authority: "Indian Union Driving License"
    });
    License.create({
        license_no: '1774567',
        name: "Sehnab Das",
        valid_from: new Date("1999-01-31"),
        valid_till: new Date("2019-01-30"),
        class_of_vehicle: "LMV",
        issuing_authority: "Indian Union Driving License"
    });
    License.create({
        license_no: '1784567',
        name: "Arnab Das",
        valid_from: new Date("2009-01-31"),
        valid_till: new Date("2029-01-30"),
        class_of_vehicle: "LMV",
        issuing_authority: "Indian Union Driving License"
    });

    //Officer
    Officer.create({
        id: "124",
        password: "abcdef",
        location: {
            type: "Point",
            coordinates: [
                85.815678,
                20.348039
            ]
        },
    });

    //Hospital
    Hospital.create({
        id: "H1",
        password: "password",
        location: {
            type: "Point",
            coordinates: [
                85.847755,
                20.348039
            ]
        },
    });

    //Vechile
    Vehicle.create({
        registration_no: "OD01Q1234",
        class_of_vehicle: "LMV",
        manufacturer: "SUZUKI",
        seating_capacity: 4,
        cubic_capacity: 999,
        color: "Grey",
        chasis_number: "MA6MFBC1BBT096359",
        engine_number: "52WVC10331",
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

    Vehicle.create({
        registration_no: "OD02Q1234",
        class_of_vehicle: "LMV",
        manufacturer: "SUZUKI",
        seating_capacity: 4,
        cubic_capacity: 999,
        color: "Grey",
        chasis_number: "MC7MFBC1BBT096358",
        engine_number: "52WVC10339",
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


    Vehicle.create({
        registration_no: "OD16Q1234",
        class_of_vehicle: "LMV",
        manufacturer: "TVS",
        seating_capacity: 4,
        cubic_capacity: 999,
        color: "Grey",
        chasis_number: "MB6MFBC1BBT096358",
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

    Vehicle.create({
        registration_no: "OD33Q1234",
        class_of_vehicle: "LMV",
        manufacturer: "SUZUKI",
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