const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ pesan: 'Token tidak ada' })
    }
    
    jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
        if (err) {
            return res.status(403).json({ pesan: 'Token tidak valid' })
        }
        req.user = decoded
        next()
    })
}

module.exports = verifyToken