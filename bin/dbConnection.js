let MONGOOSE = require('mongoose');


module.exports = (URL) => {
    return new Promise((resolve, reject) => {
        MONGOOSE.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err, response) => {
            if (err)
                reject(err);
            else
                resolve(null);
        });
    })
};