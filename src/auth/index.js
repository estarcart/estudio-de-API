const jwt = require('jsonwebtoken');
config = require('../config');
const error = require('../middleware/errors');

const secret = config.jwt.secret;

function asignarToken(data){
    return jwt.sign(data,secret, {expiresIn: '7d'});
}

function verificarToken(token){
    return jwt.verify(token, secret);
}

const chequearToken = {
        confirmarToken: function(req, id){
            const decoficado = decodificarCabecera(req);

            if(decoficado !== id){
                throw error('No tienes permisos', 401);
            }
        }
    }

function obtenerToken(autorizacion){
    if(!autorizacion){
        throw error('No viene token', 401);
    }
    if(autorizacion.indexOf('Bearer') === -1){
        throw error('Formato invalido', 401);
    }
    
    let token = autorizacion.replace('Bearer ', '');
    return token;
}

function decodificarCabecera(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}

module.exports = {
    asignarToken,
    chequearToken,
}