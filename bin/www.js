'use strict';

/***********************************
 **** node module defined here *****
 ***********************************/
const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");


/**creating express server app for server */
const app = EXPRESS();


/********************************
 ***** Server Configuration *****
 ********************************/
app.set('port', process.env.PORT);
app.use(EXPRESS.static("client"));
app.use(BODY_PARSER.json({ limit: '50mb' }));
app.use(BODY_PARSER.urlencoded({ limit: '50mb', extended: true }));

/*******************************
 *** For handling CORS Error ***
 *******************************/
app.all('/*', (REQUEST, RESPONSE, NEXT) => {
    RESPONSE.header('Access-Control-Allow-Origin', '*');
    RESPONSE.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
    RESPONSE.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    RESPONSE.header('Access-Control-Max-Age', 1800);
    NEXT();
});

/*******************************
 ****** initializing routes ****
 *******************************/
require('../server/routes/driverRoutes')(app);
require('../server/routes/officerRoutes')(app);
require('../server/routes/hospitalRoutes')(app);


/** server listening */
module.exports = () => {
    /** Server is running here */
    app.listen(process.env.PORT, () => {
        Console.log(`Server started at PORT: ${process.env.port}`);
    });
};