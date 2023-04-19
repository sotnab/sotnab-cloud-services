import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import useFileUpload from '../hooks/useFileUpload'

const FileUploadForm = ({ reload }) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const { upload, isLoading, error } = useFileUpload()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedFile) {
            return
        }

        await upload(selectedFile)

        e.target.reset()
        setSelectedFile(null)

        reload()
    }

    return (
        <form className="drive__form form" onSubmit={handleSubmit}>
            <h2 className="form__title">Add file</h2>

            <div className="form__row">
                <p htmlFor="file" className="form__file-name">
                    File: {selectedFile ? selectedFile.name : 'No files selected'}
                </p>

                <label htmlFor="file" className="form__file-add">
                    <FaPlus className="form__icon" />
                </label>
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

            <button className="form__btn" disabled={isLoading}>Add</button>
        </form>
    )
}

export default FileUploadForm