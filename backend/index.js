const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

const userRoutes = require('./routes/userRoutes')
const fileRoutes = require('./routes/fileRoutes')
const settingRoutes = require('./routes/settingRoutes')

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/user/', userRoutes)
app.use('/api/file/', fileRoutes)
app.use('/api/setting/', settingRoutes)

app.use(express.static('public/build'))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'))
})

const setup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        app.listen(process.env.PORT)

        console.log('App listening on port:', process.env.PORT)

    } catch (error) {
        console.log(error)
    }
}

setup()