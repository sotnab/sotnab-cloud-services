const { Router } = require('express')
const { getFile, uploadFile } = require('../controllers/mediaFileController')

const router = Router()

router.get('/:id', getFile)

router.post('/', uploadFile)

module.exports = router