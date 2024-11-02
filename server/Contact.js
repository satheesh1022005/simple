const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    profile:String,
    name: String,
    email: String,
    phone: String,
    address: String,
    department: String,
    domain: String,
    github: String,
    linkedin: String
});

module.exports = mongoose.model('Contact', contactSchema);
