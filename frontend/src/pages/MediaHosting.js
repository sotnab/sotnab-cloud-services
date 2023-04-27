import { useEffect, useState } from 'react'
import MediaUploadForm from '../components/MediaUploadForm'
import HostedFile from '../components/HostedFile'
import useAuthContext from '../hooks/useAuthContext'

const MediaHosting = () => {
    const [files, setFiles] = useState([])
    const { user } = useAuthContext()

    // const time1 = new Date()
    // const time2 = new Date()

    // time1.setTime(Date.now() + 1 * 3600 * 1000)
    // time2.setTime(Date.now() + 16 * 3600 * 1000)

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch('/api/file/media', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            setFiles(json.files)
        }

        fetchFiles()
    }, [])

    return (
        <div className="media-hosting">
            <h2 className="media-hosting__title">Host your media for free</h2>
            <h3 className="media-hosting__subtitle">Up to 50MB for 24 hours</h3>

            <MediaUploadForm />

            <div className="media-hosting__files">
                <h3 className="media-hosting__files">Your hosted media</h3>

                <div className="media-hosting__list">
                    {files.map((file) => <HostedFile file={file} key={file._id} />)}
                </div>
            </div>
        </div>
    )
}

export default MediaHosting