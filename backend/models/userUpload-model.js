const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userUploadSchema = new Schema({
    personID: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    zipCode: {
        type: String,
        require: true
    },
    imgPath: {
        type: String
    },
    date: {
        type: Date,
        require: true
    },
    coordinates: {
        longitude: {
            type: Number,
            require: true
        },
        latitude: {
            type: Number,
            require: true
        }
    }
})

module.exports = userUpload = mongoose.model("userUpload", userUploadSchema)