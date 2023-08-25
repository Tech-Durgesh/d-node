const express = require("express");
const app = express();
const PORT = require("./config/.env.prod");
require("./config/db.config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

const BlogRouter = require("./modules/blogs/routes/blogs.routes.server");
const AuthRouter = require("./modules/auth/routes/auth.routes.server");

app.use("/api/auth", AuthRouter);
app.use("/api/users", AuthRouter);
app.use("/api/blogs", BlogRouter);

app.listen(PORT);