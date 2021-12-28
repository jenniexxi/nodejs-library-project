var mongoose = require('mongoose');
var schema = mongoose.Schema;

var memberInfoSchema = new schema({
    id: String,
    password: String,
    name: String,
    phone: Number,
    email: String
});

module.exports = mongoose.model('memberInfo', memberInfoSchema);
