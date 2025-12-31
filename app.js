require('dotenv').config();
console.log('>>> APP.JS CARGADO <<<');

const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
console.log('SwaggerSpec:', swaggerSpec);
app.get('/test', (req, res) => {
    res.send('OK');
});
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/auth', require('./routes/auth'));


module.exports = app;
