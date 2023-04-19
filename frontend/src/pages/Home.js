import { Link } from 'react-router-dom'
import { FiHardDrive } from 'react-icons/fi'
import { MdOutlinePermMedia } from 'react-icons/md'

const Home = () => {
    return (
        <div className="home">
            <h2 className="home__title">Services</h2>

            <div className="home__services">
                <Link to="/drive" className="home__link">
                    <FiHardDrive className="home__icon" />
                    Drive
                </Link>


                <Link to="/media-hosting" className="home__link">
                    <MdOutlinePermMedia className="home__icon" />
                    Media Hosting
                </Link>
            </div>
        </div>
    )
}

export default Home