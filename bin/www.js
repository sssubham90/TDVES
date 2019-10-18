/***********************************
 **** node module defined here *****
 ***********************************/
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const CORS = require('cors');

/**creating express server app for server */
const app = EXPRESS();


/********************************
 ***** Server Configuration *****
 ********************************/
app.set('port', process.env.PORT);
app.use(EXPRESS.static("client"));
app.use(CORS());
app.use(BODY_PARSER.json({
    limit: '50mb'
}));
app.use(BODY_PARSER.urlencoded({
    limit: '50mb',
    extended: true
}));

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

/********************************
 ****** welcome to tdves api ****
 ********************************/
app.route('/api/').get((REQUEST, RESPONSE) => {
    RESPONSE.send("Welcome to TDVES");
});

/** server listening */
module.exports = () => {
    /** Server is running here */
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server started at PORT: ${process.env.port || 3000}`);
    });
};