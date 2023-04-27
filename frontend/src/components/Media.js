import { useParams } from 'react-router-dom'

const Media = () => {
    const { id } = useParams()

    // add images

    return (
        <div className="media">
            <video controls width="100%" >
                <source src={`/api/file/media/stream/${id}`} />
            </video>
        </div>
    )
}

export default Media