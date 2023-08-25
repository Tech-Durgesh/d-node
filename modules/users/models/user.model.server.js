const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required!"]
    },
    lastname: {
        type: String,
        required: [true, "Last name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required!"]
    },
    address: {
        type: String,
        required: [true, "Address is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;