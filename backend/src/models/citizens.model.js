const mongoose = require('mongoose');

const CitizenSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    city_id: { type: Number, required: true },
    groups: [
        {
            type: { type: String, required: true },
            name: { type: String, required: true }
        },
    ]
});

exports.Citizens = mongoose.model('citizens', CitizenSchema);
