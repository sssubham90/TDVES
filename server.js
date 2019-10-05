let www = require('./bin/www.js');

let db = require('./bin/dbConnection.js');

let serverConfig = require('./server/config/dbConfig');

let dummyData = require('./dummyData');

db(serverConfig.mongodb.url).then(resolve => {
    console.log(`*********DB is connected successfully*********`);
    // dummyData.create();
    www();

}).catch(err => {
    console.log(`*********err*********\n${err}`);
});