const express = require("express");
const morgan = require("morgan");
const cors = require ("cors");
const app = express(); //instanciando express para poder usar sus metodos y propiedadess    

//imports
const personRoutes = require ("./routes/person_routes");

//settings
app.set('port',3000);

//middlware - funciones que se ejecutan antes, en medio o despues de una solicitud
//SE EJECUTARAN ANTES DE QUE LA SOLICITUD LLEGUE AL SERVIDOR
app.use(morgan('dev')); //indica que tipo de solicitud esta entrando (verbos get, delete, etc...)
app.use(express.json()); //la informacion que entra a la api es de tipo json
app.use(express.urlencoded({extended:false}));
app.use(cors());

//routes
app.use(personRoutes);
/*app.get("/", (req,res) => { //Funcion flecha, ejecuta una accion
    res.status(200).json({mensaje: "Todo bien"});
});*/

//run
app.listen(app.get('port'), () => {
    console.log('Server run...');
});

