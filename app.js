const debug = require('debug')('app:inicio');
const express = require('express');
const config = require('config');
const app = express();
const morgan = require('morgan');

const usuarios = require('./routes/usuarios');

app.use(express.json());//body
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios);

//Configuración de entornos
//Para cambiar de entorno usar: $env:NODE_ENV="production" por ejemplo
console.log("Aplicación: ", config.get('nombre'));
console.log('BD server: ', config.get('configDB.host'));

//Uso de un middleware de terceros - Morgan
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan está habilitado');
}

//Trabajos con la base de datos
debug('Conectando con la BD....');


app.get('/', (req, res) =>{
    res.send('Hola mundo desde Express.');
});



const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`Escuchando en el puerto ${port}...`);
});

