const { Router } = require('express')
const mediaFileRoutes = require('./mediaFileRoutes')

const requireAuth = require('../middleware/requireAuth')
const upload = require('../utils/upload')
const { getFiles, uploadFile, deleteFile } = require('../controllers/fileController')

const router = Router()

router.use('/media/', mediaFileRoutes)

router.use(requireAuth)

router.get('/', getFiles)

router.post('/', upload.any(), uploadFile)

router.delete('/', deleteFile)

module.exports = router