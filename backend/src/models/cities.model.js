const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    data: { type: String, required: true },
});

exports.Cities = mongoose.model('cities', CitySchema);
