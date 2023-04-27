import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { FiCloud } from 'react-icons/fi'
import useAuthContext from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'

const Header = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <header className="header">
            <div className="header__wrap wrap">
                <Link to="/" className="header__title-link">
                    <h1 className="header__title">
                        <FiCloud className="header__logo" />

                        <div className="header__name">
                            sotnab cloud<br />services
                        </div>
                    </h1>
                </Link>

                {!user && (
                    <div className="header__actions">
                        <Link to="/login" className="header__link">Login</Link>
                        <Link to="/signup" className="header__link">Sign up</Link>
                    </div>
                )}

                {user && (
                    <div className="header__actions">
                        <div className="header__user">
                            <FaUserAlt className="header__icon" />
                            <strong className="header__email">{user.email}</strong>
                            <button className="header__btn" onClick={handleLogout}>Log out</button>
                        </div>

                        {user.admin && <Link to='/admin' className='header__link'>Admin Panel</Link>}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header