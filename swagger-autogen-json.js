const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "gym-pool-website",
    description: "Автогенерація Swagger документації",
  },
  host: "localhost:3001",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
