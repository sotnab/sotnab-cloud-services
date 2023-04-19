import { FaImage, FaFile, FaFilm, FaFileCode, FaFileAlt } from 'react-icons/fa'

const resolveUrl = (path) => {
    const { NODE_ENV } = process.env

    if (NODE_ENV === 'development') {
        return 'http://localhost:20177' + path
    }

    return path
}

const getIcon = (extension) => {
    switch (extension) {
        case 'jpg':
        case 'png':
        case 'svg':
        case 'gif':
            return FaImage
        case 'mp4':
            return FaFilm
        case 'js':
        case 'css':
        case 'html':
        case 'ts':
        case 'cpp':
        case 'php':
        case 'py':
            return FaFileCode
        case 'txt':
            return FaFileAlt
        default:
            return FaFile
    }
}

export {
    resolveUrl, getIcon
}