const sendResponse = require("../../helpers/common");
const bcrypt = require("bcrypt");
const UserModel = require("../models/auth.server.models");

const SignUp = async (req = null) => {
    if (req?.body) {
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
}

module.exports = {
    SignUp,
}