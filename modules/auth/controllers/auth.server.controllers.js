const bcrypt = require("bcrypt");
const UserModel = require("../../users/models/user.model.server");
const jwt = require("jsonwebtoken");
const messages = require("../../helpers/messages");
const sendResponse = require("../../helpers/common");
var privateKey = "TestPrivateKey";

const SignUp = async (req, resp) => {
    if (req?.body?.email) {
        let exist = await UserModel.find({ email: req?.body?.email });
        if (exist.length) {
            return resp.status(400).send({
                status: false,
                code: 400,
                data: {},
                message: messages.EMAIL_ALREADY_EXIST
            });
        }
        try {
            let hashed = await bcrypt.hash(req?.body?.password, 10);
            let record = {
                "firstname": req?.body?.firstname,
                "lastname": req?.body?.lastname,
                "email": req?.body?.email,
                "phone": req?.body?.phone,
                "address": req?.body?.address,
                "password": hashed,
            }
            let saveData = new UserModel(record);
            let user = await saveData.save();
            let withoutPassword = user.toObject();
            delete withoutPassword.password;
            return resp.status(200).send({
                status: true,
                code: 200,
                data: withoutPassword,
                message: messages.USER_REGISTERED_SUCCESSFULLY
            });
        } catch (error) {
            const transformedObject = {};
            for (const key in error?.errors) {
                if (error?.errors.hasOwnProperty(key)) {
                    transformedObject[key] = error?.errors[key].message;
                }
            }
            return resp.status(400).send({
                status: false,
                code: 400,
                data: {},
                message: transformedObject
            });
        }
    }
    return resp.status(400).send({
        status: false,
        code: 400,
        data: {},
        message: messages.SOMETHING_WENT_WRONG
    });
}

const SignIn = async (req, resp) => {
    if (req?.body?.email && req?.body?.password) {
        let user = await UserModel.countDocuments({ email: req?.body?.email });
        if (!user) {
            return resp.status(400).send({
                status: false,
                code: 400,
                data: {},
                message: messages.EMAIL_NOT_REGISTERED
            });
        }
        user = await UserModel.find({ email: req?.body?.email });
        let hashed = await bcrypt.compare(req?.body?.password, user[0]?.password);
        if (!hashed) {
            return resp.status(400).send({
                status: false,
                code: 400,
                data: {},
                message: messages.INVALID_PASSWORD
            });
        }
        else {
            var token = jwt.sign({
                id: user[0]?._id,
                firstname: user[0]?.firstname,
                lastname: user[0]?.lastname,
                email: user[0]?.email,
            }, privateKey, { expiresIn: "1hr" });
            let withoutPassword = user[0].toObject();
            delete withoutPassword.password;
            let loggedInUser = {
                user: withoutPassword,
                token: token,
            }
            return resp.status(200).send({
                status: true,
                code: 200,
                data: loggedInUser,
                message: messages.LOGGED_IN_SUCCESSFULLY
            });
        }
    }
    return resp.status(400).send({
        status: false,
        code: 400,
        data: {},
        message: messages.SOMETHING_WENT_WRONG
    });
}

// const UpdateProfile = async (req = null) => {
//     const authorization = req?.headers?.authorization;
//     if (!authorization) {
//         return sendResponse(false, 400, {}, "Authorization token not found!");
//     }
//     const token = authorization.split(" ")[1];
//     if (token) {
//         try {
//             jwt.verify(token, 'wrong-secret', function (error, decoded) {
//                 if (error) {
//                     return sendResponse(false, 400, {}, "Authorization token is invalid!");
//                 }
//                 return sendResponse(true, 200, decoded, "Fetched token successfully!");
//             });
//         } catch (error) {
//             return sendResponse(false, 400, error, "Something went wrong with token, Please try again with correct details!");
//         }
//     }
// }

module.exports = {
    SignUp,
    SignIn,
}