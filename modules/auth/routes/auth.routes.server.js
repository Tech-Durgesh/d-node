const express = require("express");
const AuthController = require("../controllers/auth.server.controllers");
const Router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               code: 200
 *               data:
 *                 firstname: John
 *                 lastname: Doe
 *                 email: john@example.com
 *                 phone: 1234567890
 *                 address: Some Address
 *               message: Data retrieved!
 */

Router.post('/signup', AuthController.SignUp);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: 123465
 *               
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               code: 200
 *               data:
 *                 firstname: John
 *                 lastname: Doe
 *                 email: john@example.com
 *                 phone: 1234567890
 *                 address: Some Address
 *               message: Data retrieved!
 */
Router.post('/signin', AuthController.SignIn);

module.exports = Router;