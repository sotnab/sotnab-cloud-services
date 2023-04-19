const { Router } = require('express')
const mediaFileRoutes = require('./mediaFileRoutes')

const requireAuth = require('../middleware/requireAuth')
const upload = require('../utils/upload')
const { getFiles, uploadFile, deleteFile } = require('../controllers/fileController')

const router = Router()

router.use(requireAuth)

router.get('/', getFiles)

router.post('/', upload.any(), uploadFile)

router.delete('/', deleteFile)

router.use('/media/', mediaFileRoutes)

module.exports = router