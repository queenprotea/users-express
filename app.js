require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));

module.exports = app;
