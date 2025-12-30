const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Usuarios',
        version: '1.0.0',
        description: 'Documentación de la API de Usuarios'
    },
    servers: [
        {
            url: 'http://localhost:8085'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // 👈 ESTA RUTA ES CLAVE
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
