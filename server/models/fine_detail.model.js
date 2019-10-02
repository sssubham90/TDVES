const mongoose = require('mongoose');

const fineDetailSchema = new mongoose.Schema({
    rule: String,
    fine_amt: Number
});

module.exports = mongoose.model('fineDetail', fineDetailSchema);