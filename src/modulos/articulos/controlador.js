const TABLA = 'articulos';
module.exports = function (dbInyectada){

    let db = dbInyectada;

    if(!db){
        db = require('../../db/mysql');
    }

    function todos () {
        return db.todos(TABLA);
    }
    
    function uno (id) {
        return db.uno(TABLA, id);
    }

    return{
        todos,
        uno,
    }
}