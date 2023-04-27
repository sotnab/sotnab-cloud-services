const { Router } = require('express')
const upload = require('../utils/upload')
const { getMediaFiles, getMediaFile, getMediaFileStream, uploadMediaFile, deleteFile } = require('../controllers/mediaFileController')
const requireAuth = require('../middleware/requireAuth')

const router = Router()

router.get('/:id', getMediaFile)

router.get('/stream/:id', getMediaFileStream)

router.use(requireAuth)

router.get('/', getMediaFiles)

router.post('/', upload.single('file'), uploadMediaFile)

router.delete('/:id', deleteFile)

module.exports = router