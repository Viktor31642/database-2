// const swaggerJSDoc = require("swagger-jsdoc");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Prime Life Club API Docs",
//       version: "1.0.0",
//       description: "Документація для API Prime Life Club (Express + Sequelize)",
//     },
//     servers: [
//       {
//         url: "http://localhost:3001/api",
//         description: "Local server",
//       },
//     ],
//   },
//   // тут описуємо, де шукати swagger-коментарі
//   apis: ["./routes/*.js"],
// };

// const swaggerSpec = swaggerJSDoc(options);
// module.exports = swaggerSpec;


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prime Life Club API",
      version: "1.0.0",
      description: "Документація REST API для клубу",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // де зберігаються Swagger-коментарі
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger доступний за адресою: http://localhost:3001/api/docs");
}

module.exports = swaggerDocs;
