const { Schema, model } = require('mongoose')

const MediaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Media = model('Media', MediaSchema)

module.exports = Media