const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: 'src/.env' });

const rutasProyecto = {
    rutasUsuarios: require('./rutas/Usuarios.js'),
};

const app = express();

// Configuración de CORS y BodyParser
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '200mb' }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Configurar encabezados CORS personalizados
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, token'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.set('trust proxy', true);

// Base URL para las rutas
const baseURL = '/api/v2';

// Rutas de la API
app.use(baseURL + '/Usuarios', rutasProyecto.rutasUsuarios);

// Puerto del servidor
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en http://0.0.0.0:${port}`);
});
