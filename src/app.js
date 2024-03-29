const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas');
const articulos = require('./modulos/articulos/rutas');
const auth = require('./modulos/auth/rutas');
const error = require('./red/errors');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Configuracion
app.set('port', config.app.port);
// Rutas
app.use('/api/clientes', clientes);
app.use('/api/articulos', articulos);
app.use('/api/auth', auth);
app.use(error);

module.exports = app;