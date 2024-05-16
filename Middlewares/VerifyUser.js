const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1];
    
        console.log(token);
        jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
            
            if (err) {
                console.log(err);
                return res.status(404).json('Your Token is Expired Pls Login')
                

            } else {
                req.user = decoded
                next()
            }

        });  
    }
    
    else {
        return res.status(404).json({message: 'Please Login'})
    }
};

module.exports = {verifyToken}