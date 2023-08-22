const express = require("express");
const app = express();
const PORT = require("./config/.env.prod");
require("./config/db.config")

const BlogRouter = require("./modules/blogs/routes/blogs.routes.server");
const AuthRouter = require("./modules/auth/routes/auth.routes.server");

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/blogs", BlogRouter);



app.listen(PORT);