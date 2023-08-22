const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const sendResponse = require("../../helpers/common");
const UserModel = require("../models/auth.server.models");
var privateKey = "TestPrivateKey";

const SignUp = async (req = null) => {
    if (req?.body?.email) {
        let exist = await UserModel.find({ email: req?.body?.email });
        if (exist.length) {
            return sendResponse(false, 400, {}, "Email already exist, Please try with another email or login with the existing email address!");
        }
        try {
            let hashed = await bcrypt.hash(req?.body?.password, 10);
            let record = {
                "name": req?.body?.name,
                "email": req?.body?.email,
                "phone": req?.body?.phone,
                "address": req?.body?.address,
                "password": hashed,
            }
            let saveData = new UserModel(record);
            let user = await saveData.save();
            let withoutPassword = user.toObject();
            delete withoutPassword.password;
            return sendResponse(true, 200, withoutPassword, "Data retrived!");
        } catch (error) {
            const transformedObject = {};
            for (const key in error?.errors) {
                if (error?.errors.hasOwnProperty(key)) {
                    transformedObject[key] = error?.errors[key].message;
                }
            }
            return sendResponse(false, 400, {}, transformedObject);
        }
    }
    return sendResponse(false, 400, {}, "Something went wrong, Please try again with your details!");
}

const SignIn = async (req = null) => {
    if (req?.body?.email && req?.body?.password) {
        let user = await UserModel.find({ email: req?.body?.email });
        if (!user.length) {
            return sendResponse(false, 400, {}, "Email not registered!");
        }
        let hashed = await bcrypt.compare(req?.body?.password, user[0]?.password);
        if(!hashed){
            return sendResponse(false, 400, {}, "Invalid password!");
        }
        else{
            var token = jwt.sign({
                name: user[0]?.name,
                email: user[0]?.email,
            }, privateKey, );
            let withoutPassword = user[0].toObject();
            delete withoutPassword.password;
            let loggedInUser = {
                user: withoutPassword,
                token: token,
            }
            return sendResponse(true, 200, loggedInUser, "Loggedin successfully!");
        }
    }
    return sendResponse(false, 400, {}, "Something went wrong, Please try again with correct credentials!");
}

module.exports = {
    SignUp,
    SignIn
}