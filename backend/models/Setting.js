const { Schema, model } = require('mongoose')

const SettingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    booleanValue: {
        type: Boolean,
        required: false
    },
    literalValue: {
        type: String,
        required: false
    }
})

const Setting = model('Setting', SettingSchema)

module.exports = Setting