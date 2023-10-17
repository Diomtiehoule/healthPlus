const Jwt = require('jsonwebtoken');


module.exports = (req , res , next) => {
    console.log(req.headers.authorization.split(' ')[1])

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = Jwt.verify(token , 'RANDOM_TOKEN_SECRET');
        let userId = decodedToken.userId;
        console.log(userId)
        userId = {
            userid :userId
        };
        req.auth = userId;
        next();
    }catch(err){
        console.log(err)
        res.status(401).json({message : "une erreur s'est produit au niveau du token !!!"});
    }
}