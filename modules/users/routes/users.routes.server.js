const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/user.controller.server");

/**
 * @swagger
 * /api/users/all-users:
 *   get:
 *     summary: Get a list of users
 *     tags:
 *       - Users
 *     description: Retrieve a list of users from the server.
 *     responses:
 *       200:
 *         description: Successful response with the list of users
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   name: John Doe
 *                 - id: 2
 *                   name: Jane Smith
 */
Router.get('/all-users', UserController.AllUsers);

Router.post('/update-user/:uid', UserController.UpdateUser);

module.exports = Router;