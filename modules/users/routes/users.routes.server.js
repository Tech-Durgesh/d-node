const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/user.controller.server");

Router.get('/all-users', UserController.AllUsers);

module.exports = Router;