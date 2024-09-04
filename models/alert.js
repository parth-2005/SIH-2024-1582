const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pole = require('./pole');

/*

{
    "code": int,
    "message": string,
    "data":{
        "current": float,
        "resistance": float,
    },
    "timestamp": Timestamp
    "PoleID": PoleID
}

*/

const alertSchema = new Schema({
    code: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    data: {
        current: {
            type: Number,
            required: true,
        },
        resistance: {
            type: Number,
            required: true,
        }
    },
    timestamp: {
        type: Date,
        required: true,
    },
    PoleID: {
        type: Schema.Types.ObjectId,
        ref: 'Pole',
        required: true,
    }
});

module.exports = mongoose.model('Alert', alertSchema);