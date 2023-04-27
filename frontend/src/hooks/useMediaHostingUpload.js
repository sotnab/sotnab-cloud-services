import { useState } from 'react'
import useAuthContext from './useAuthContext'

const useMediaHostingUpload = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()

    const upload = async (title, file) => {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('file', file)

        setError(null)
        setIsLoading(true)

        const response = await fetch('/api/file/media', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: formData
        })

        const json = await response.json()

        setIsLoading(false)

        if(!response.ok) {
            setError(json.error)
        }
    }

    return { upload, error, isLoading }
}

export default useMediaHostingUpload