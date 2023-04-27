const fs = require('fs')
const mime = require('mime')
const path = require('path')
const Media = require('../models/Media')

const imageTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/jpg', 'image/tiff', 'image/png', 'image/ief']

const getMediaFile = async (req, res) => {
    const { id } = req.params

    try {
        const file = await Media.findById(id)

        res.status(200).json({ file })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMediaFiles = async (req, res) => {
    try {
        const files = await Media.find({ user_id: req.user._id })

        res.status(200).json({ files })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMediaFileStream = async (req, res) => {
    const id = req.params.id
    const range = req.headers.range

    try {
        const file = await Media.findById(id)

        const filePath = path.join(__dirname, '..', 'public', 'uploads', file.name)
        const fileSize = fs.statSync(filePath).size
        const mimeType = mime.getType(file.name)

        if (imageTypes.includes(mimeType)) {
            return res.status(200).sendFile(filePath)
        } else if (!range) {
            return res.status(400).json({ error: 'Requires range header' })
        }

        const CHUNK_SIZE = 10 ** 6
        const start = Number(range.replace(/\D/g, ''))
        const end = Math.min(start + CHUNK_SIZE, fileSize - 1)

        const contentLength = end - start + 1
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': mimeType
        }

        res.writeHead(206, headers)

        const fileStream = fs.createReadStream(filePath, { start, end })

        fileStream.pipe(res)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const uploadMediaFile = async (req, res) => {
    const { title } = req.body
    const { filename, extension } = req.file

    if (!title || !req.file) {
        return res.status(400).json({ error: 'No file provided' })
    }

    const fileData = {
        title,
        name: filename,
        type: extension,
        user_id: req.user._id
    }

    try {
        const file = await Media.create(fileData)

        res.status(200).json({ file })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteFile = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await Media.findByIdAndDelete(id)

        fs.unlinkSync(`../public/uploads/${deleted.name}`)

        res.status(200).json({ file: deleted })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getMediaFile, getMediaFiles, getMediaFileStream, uploadMediaFile, deleteFile
}