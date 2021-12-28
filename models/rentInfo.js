var mongoose = require('mongoose');
var schema = mongoose.Schema;

var rentSchema = new schema({
    bookName: String,
    rentInfo: Boolean,
    returnDate: Date,
    id: String
});

module.exports = mongoose.model('rent', rentSchema);
