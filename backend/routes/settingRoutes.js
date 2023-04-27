const { Router } = require('express')
const { getSettings, getSetting, patchSetting } = require('../controllers/settingController')
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')

const router = Router()

router.get('/', getSettings)

router.get('/:name', getSetting)

router.use(requireAuth)
router.use(requireAdmin)

router.patch('/:name', patchSetting)

module.exports = router