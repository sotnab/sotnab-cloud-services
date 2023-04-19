import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import HostedFile from '../components/HostedFile'
import useMediaHostingUpload from '../hooks/useMediaHostingUpload'

const MediaHosting = () => {
    const [title, setTitle] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

    const { upload, isLoading, error } = useMediaHostingUpload()

    const time1 = new Date()
    const time2 = new Date()

    time1.setTime(Date.now() + 1 * 3600 * 1000)
    time2.setTime(Date.now() + 16 * 3600 * 1000)

    const files = [
        { id: '1', url: 'http://localhost:3000/sjjwndysd', type: 'jpg', expires: time1 },
        { id: '2', url: 'http://localhost:3000/27893casi', type: 'mp4', expires: time2 }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedFile) {
            return
        }

        // upload

        e.target.reset()
        setSelectedFile(null)
    }

    return (
        <div className="media-hosting">
            <h2 className="media-hosting__title">Host your media for free</h2>
            <h3 className="media-hosting__subtitle">Up to 50MB for 24 hours</h3>

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

            <div className="media-hosting__files">
                <h3 className="media-hosting__files">Your hosted media</h3>

                <div className="media-hosting__list">
                    {files.map((file) => <HostedFile file={file} key={file.id} />)}
                </div>
            </div>
        </div>
    )
}

export default MediaHosting