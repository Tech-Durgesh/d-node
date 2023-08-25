const swaggerDoc = require("swagger-jsdoc");
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
    apis: ["./modules/auth/routes/*.js"]
};

const swaggerSpec = swaggerDoc(options);
module.exports = swaggerSpec;