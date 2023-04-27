import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import useMediaHostingUpload from '../hooks/useMediaHostingUpload'

const MediaUploadForm = () => {
    const [title, setTitle] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    const { upload, isLoading, error } = useMediaHostingUpload()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedFile) {
            return
        }

        await upload(title, selectedFile)

        setTitle('')
        setSelectedFile(null)
    }

    return (
        <form className="form form--media-hosting" onSubmit={handleSubmit}>
            <h3 className="form__title form__title--light">Add file</h3>

            <div className="form__row">
                <input
                    type="text"
                    className="form__control form__control--oln"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="file" className="form__file-add form__file-add--media-hosting">
                    <FaPlus className="form__icon" />
                </label>

                <p htmlFor="file" className="form__file-name">
                    File: {selectedFile ? selectedFile.name : 'No files selected'}
                </p>

                <button className="form__btn" disabled={isLoading}>Add</button>
            </div>

            <input
                type="file"
                id="file"
                className="form__file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            {error && (
                <div className="form__error">{error}</div>
            )}
        </form>
    )
}

export default MediaUploadForm