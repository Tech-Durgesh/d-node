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
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "JWT Bearer token",
                }
            }
        },
        security: [{ BearerAuth: [] }],
    },
    apis: [
        "./modules/auth/routes/*.js",
        "./modules/users/routes/*.js",
    ]
};

const swaggerSpec = swaggerDoc(options);
module.exports = swaggerSpec;