import { IoMdOpen } from 'react-icons/io'

import { getIcon } from '../utils'

const HostedFile = ({ file }) => {
    const Icon = getIcon(file.type)

    const millisecondsLeft = file.expires - Date.now()
    const hoursLeft = Math.ceil(millisecondsLeft / (1000 * 3600))
    const percentage = hoursLeft / 24 * 100

    return (
        <div className="media-hosting__file">
            <Icon className="media-hosting__icon" />

            <p className="media-hosting__strong">{file.url}</p>

            <div className="media-hosting__time">
                {hoursLeft} {hoursLeft === 1 ? 'hour' : 'hours'} left

                <div className="media-hosting__timer">
                    <div className="media-hosting__hand" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>

            <a href={file.url} className="media-hosting__link">
                <IoMdOpen className="media-hosting__icon" />
            </a>
        </div>
    )
}

export default HostedFile