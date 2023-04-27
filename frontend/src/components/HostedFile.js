import { Link } from 'react-router-dom'
import { IoMdOpen } from 'react-icons/io'
import { getIcon } from '../utils'

const ONE_DAY = 3600 * 1000 * 24

const HostedFile = ({ file }) => {
    const Icon = getIcon(file.type)

    const createDate = new Date(file.createdAt).getTime()
    const actualDate = Date.now()

    let millisecondsPast = actualDate - createDate
    
    if(millisecondsPast > ONE_DAY) {
        millisecondsPast = ONE_DAY
    }
    
    const hoursLeft = Math.floor((ONE_DAY - millisecondsPast) / (3600 * 1000))
    const percentage = (ONE_DAY - millisecondsPast) / ONE_DAY * 100

    return (
        <div className="media-hosting__file">
            <Icon className="media-hosting__icon" />

            <p className="media-hosting__strong">{file.title}</p>

            <div className="media-hosting__time">
                {hoursLeft} {hoursLeft === 1 ? 'hour' : 'hours'} left

                <div className="media-hosting__timer">
                    <div className="media-hosting__hand" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>

            <Link to={file._id} className="media-hosting__link">
                <IoMdOpen className="media-hosting__icon" />
            </Link>
        </div>
    )
}

export default HostedFile