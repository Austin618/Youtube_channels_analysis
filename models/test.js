const mongoose = require('mongoose');

const Tests = mongoose.model('tests', new mongoose.Schema({
    test: {
        type: String
    }
}))

module.exports = { Tests };