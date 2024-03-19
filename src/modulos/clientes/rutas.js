const express = require('express');

const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', seguridad(), eliminar);

// GET TODOS
async function todos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(err);
    }
};
// GET UNO
async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(err);
    }
};
// POST AGREGAR
async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'Item agregado satisfactoriamente';
        }else{
            mensaje = 'Item actualizado satisfactoriamente';
        }
        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
};
// PUT ELIMINAR
async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    } catch (error) {
        next(err);
    }
};

module.exports = router;