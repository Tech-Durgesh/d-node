require('dotenv').config({ path: './config/.env.dev' });
const express = require("express");
const app = express();
const PORT = process.env.DEFAULT_PORT;
require("./config/db.config");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

const AuthRouter = require("./modules/auth/routes/auth.routes.server");
const UserRouter = require("./modules/users/routes/users.routes.server");
const BlogRouter = require("./modules/blogs/routes/blogs.routes.server");

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/blogs", BlogRouter);

app.listen(PORT);