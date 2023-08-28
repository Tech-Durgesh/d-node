const UserModel = require("../../users/models/user.model.server");
const messages = require("../../helpers/messages");
const { verifyJwtToken } = require("../../helpers/common");

const AllUsers = async (req, resp) => {
    const authorization = req?.headers?.authorization;
    try {
        if (!authorization) {
            return resp.status(400).send({
                status: false,
                code: 400,
                data: {},
                message: messages.TOKEN_NOT_FOUND
            });
        }
        const token = authorization.split(" ")[1];
        let verifiedUser = verifyJwtToken(token);
        
        if(!verifiedUser){
            return resp.status(401).send({
                status: false,
                code: 401,
                data: {},
                message: messages.TOKEN_INVALID_OR_EXPIRED
            });
        }
        else{
            const users = await UserModel.find().select('-password');
            return resp.status(200).send({
                status: true,
                code: 200,
                data: users,
                message: messages.DATA_RETRIVED
            });
        }
    } catch (error) {
        return resp.status(500).send({
            status: false,
            code: 500,
            data: error,
            message: messages.SOMETHING_WENT_WRONG
        });
    }
}

module.exports = {
    AllUsers,
}