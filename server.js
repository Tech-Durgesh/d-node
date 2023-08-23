const express = require("express");
const app = express();
const PORT = require("./config/.env.prod");
require("./config/db.config");
const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "D-Node Panel",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000/"
            }
        ]
    },
    apis: ["./config/db.config"]
};

const swaggerSpec = swaggerDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const BlogRouter = require("./modules/blogs/routes/blogs.routes.server");
const AuthRouter = require("./modules/auth/routes/auth.routes.server");

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/blogs", BlogRouter);



app.listen(PORT);