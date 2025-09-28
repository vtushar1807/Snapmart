const jwt=require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY || "mySuperSecretKey_1807@$";

async function createToken(user){
    const payload = {
         username:user.username,
         email:user.email,
    }

    const options = {
        expiresIn:"1h",
    }

    return await jwt.sign(payload, SECRET_KEY, options);
}

module.exports = {
    createToken,    
}