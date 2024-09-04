const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*

{
    "PoleID": string,
    "Location": {
        "Latitude": float,
        "Longitude": float
    },
}

*/

const poleSchema = new Schema({
    PoleID: {
        type: String,
        required: true,
        unique: true,
    },
    Location: {
        Latitude: {
            type: Number,
            required: true,
        },
        Longitude: {
            type: Number,
            required: true,
        }
    }
});

module.exports = mongoose.model('Pole', poleSchema);