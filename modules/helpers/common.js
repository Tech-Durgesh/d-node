const jwt = require("jsonwebtoken");
const JWTPrivateKey = process.env.JWTPrivateKey;

const sendResponse = (status=true, code=null, data=null, message=null) => {
    let response = {
        status: status,
        code: code,
        data: data,
        message: message,
    }

    return response;
}

const verifyJwtToken = (token=null) => {
    let verifiedUser = null;
    if(token){
        jwt.verify(token, JWTPrivateKey, (error, result) => {
            if (error) {
                verifiedUser = false;
            }
            if (result) {
                verifiedUser = result;
            }
        });
    }
    return verifiedUser;
}

module.exports = {
    sendResponse,
    verifyJwtToken
};