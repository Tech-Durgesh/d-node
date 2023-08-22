const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
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