const mongoose = require('mongoose');

// const {DB_USER} = process.env;
// const {DB_PASSWORD} = process.env;

const DB_USER = 'devil';
const DB_PASSWORD = 'lucifer';

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/TDVES`;

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, option)
    .then(() => {
        console.log("Connected To DB: TDVES");
    })
    .catch(err => {
        console.log("Initial Connection Error :", err);
    });