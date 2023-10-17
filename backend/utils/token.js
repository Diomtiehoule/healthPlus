const jwt = require('jsonwebtoken')


const generateToken = (user) => {
    const jwtSecret = "RANDOM_TOKEN_SECRET"
    if(!jwtSecret) throw new Error("code token introuvable");
    return jwt.sign(user , jwtSecret , {expiresIn : 24*3600})
}


const verifyToken = (token) => {
    const jwtSecret = "RANDOM_TOKEN_SECRET"
    if(!jwtSecret)throw new Error('code token introuvable');
    return jwt.verify(token , jwtSecret)
}

module.exports = generateToken
module.exports = verifyToken
