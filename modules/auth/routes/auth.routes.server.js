const express = require("express");
const AuthController = require("../controllers/auth.server.controllers");
const Router = express.Router();

Router.post('/signup', async (req, resp)=>{
    let user = await AuthController.SignUp(req);
    resp.status(user?.code).json(user);
});

Router.post('/signin', async (req, resp)=>{
    let user = await AuthController.SignIn(req);
    resp.status(user?.code).json(user);
})

module.exports = Router;