const requireAdmin = (req, res, next) => {
    if(!req.user.admin) {
        return res.status(401).json({ message: 'unsufficient permissions' })

    } else {
        next()
    }
}

module.exports = requireAdmin