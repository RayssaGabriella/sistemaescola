import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema Escolar",
      version: "1.0.0",
      description: "API para gerenciamento de escola (alunos, professores, turmas, disciplinas e notas)"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;