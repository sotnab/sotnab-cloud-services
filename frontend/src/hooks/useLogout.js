import useAuthContext from './useAuthContext';

const useLogout = () => {
    const { dispatch: dispatchAuth } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatchAuth({ type: 'LOGOUT' })
    }

    return { logout }
}

export default useLogout