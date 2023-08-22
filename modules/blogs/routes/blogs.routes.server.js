const express = require("express");
const Router = express.Router();

Router.get('/add', (req, resp)=>{
    resp.send("Add blog ");
})
Router.get('/view', (req, resp)=>{
    resp.send("View blog");
})

module.exports = Router;