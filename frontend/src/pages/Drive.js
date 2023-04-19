import { useEffect, useState } from 'react'
import { FaRegSadTear } from 'react-icons/fa'

import useFilesContext from '../hooks/useFilesContext'
import useAuthContext from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'

import DriveFile from '../components/DriveFile'
import FileSkeleton from '../components/FileSkeleton'
import FileUploadForm from '../components/FileUploadForm'

const Drive = () => {
    const [reload, setReload] = useState(0)
    const [loading, setLoading] = useState(false)

    const { files, dispatch } = useFilesContext()
    const { user } = useAuthContext()
    const { logout } = useLogout()

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true)
            const response = await fetch('/api/file', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (response.status === 401) {
                logout()
            }

            const json = await response.json()

            dispatch({ type: 'SET_FILES', payload: json.files })
            setLoading(false)
        }

        fetchFiles()
    }, [user, reload])

    const reloadFiles = () => {
        setReload((value) => value + 1)
    }

    return (
        <div className="drive">
            <div className="files">
                {(files && !loading) && files.map((item) => (
                    <DriveFile file={item} reloadFiles={reloadFiles} key={item._id} />
                ))}

                {loading && Array(7).fill().map((item, index) => (
                    <FileSkeleton key={index} />
                ))}

                {(!files?.length && !loading) && (
                    <p className="files__info">
                        <FaRegSadTear />
                        No files to show
                    </p>
                )}
            </div>

            <FileUploadForm reload={reloadFiles} />
        </div>
    )
}

export default Drive