let www = require('./bin/www.js');

let db = require('./bin/dbConnection.js');

let serverConfig = require('./server/config/dbConfig');

db(serverConfig.mongodb.url).then(resolve => {
    console.log(`*********DB is connected successfully*********`);
    www();
}).catch(err => {
    console.log(`*********err*********  ${err}`);
});