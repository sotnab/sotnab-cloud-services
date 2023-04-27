const Setting = require('../models/Setting')

const getSettings = async (req, res) => {
    try {
        const settings = await Setting.find()
        res.status(200).json({ settings })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getSetting = async (req, res) => {
    const { name } = req.params

    if (!name) {
        return res.status(400).json({ message: 'name not provided' })
    }

    try {
        const setting = await Setting.findOne({ name })
        return res.status(200).json({ setting })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const patchSetting = async (req, res) => {
    const { name } = req.params

    if (!name) {
        return res.status(400).json({ message: 'name not provided' })
    }

    try {
        const setting = await Setting.findOneAndUpdate(
            { name },
            { $set: req.body },
            { new: true }
        )

        return res.status(200).json({ setting })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getSettings, getSetting, patchSetting
}