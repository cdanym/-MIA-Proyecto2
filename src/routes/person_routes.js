const {Router} = require('express'); //obteniendo solamente Router de express
//const { DB_TYPE_BFILE } = require('oracledb');
const router = Router();
const BD = require('../config/configdb');

//Consulta-Prueba
/*router.get('/usuarios', async(req,res) => {
    sql = 'select * from usuario';
    let result = await BD.Open(sql, {}, false); //consulta, campos que necesite, commit
    Usuarios = [];
    result.rows.map( usuario => {
        let esquemaUsuario = {
            "id_usuario": usuario[0],
            "nombre": usuario[1],
            "apellido": usuario[2],
            "pais": usuario[3],
            "fecha_nac": usuario[4],
            "correo": usuario[5],
            "contrasenia": usuario[6],
            "foto_perfil": usuario[7],
            "creditos": usuario[8]
        }
        Usuarios.push(esquemaUsuario)
    });
    console.log(result);
    //res.status(200).json({mensaje:"Todo bien"});
    res.status(200).json(Usuarios);
});*/

//READ
router.get('/getUsers', async (req, res) => {
    sql = "select * from usuario"; //consulta sql
    let result = await BD.Open(sql, [], false); //consulta, campos que necesite la consulta, commit
    Users = []; //arreglo
    result.rows.map(user => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let userSchema = {
            "id_usuario": user[0],
            "nombre": user[1],
            "apellido": user[2],
            "pais": user[3],
            "fecha_nac": user[4],
            "correo": user[5],
            "contrasenia": user[6],
            "foto_perfil": user[7],
            "creditos": user[8]
        }
        Users.push(userSchema); //agrega cada registro en formato json al arreglo Users
    })

    res.json(Users);
})

//CREATE
router.post('/addUser', async (req, res) => {
    const {nombre,apellido,pais,fecha_nac,correo,contrasenia,foto_perfil,creditos} = req.body; //{nombre que le corresponde a cada parametro del cuerpo (tienen que ser los mismos nombres al del json)}
    /*var nombre="nombreN"; 
    var apellido="apellidoN" 
    var pais="paisN";
    var fecha_nac="";
    var correo="correoN";
    var contrasenia="contraseniaN";
    var foto_perfil="fotoN";
    var creditos = 888;
    sql = "insert into usuario(nombre, apellido, pais, fecha_nac, correo, contrasenia, foto_perfil, creditos) values ('" +
        nombre + "', '" + apellido + "', '" + pais + "', SYSDATE, '" + correo + "', '" + contrasenia + "', '" + 
        foto_perfil + "', " + creditos + ");" ; //se envian los parametros en la consulta*/

    sql = "insert into usuario(nombre,apellido,pais,fecha_nac,correo,contrasenia,foto_perfil,creditos)"+ 
    "values (:nombre,:apellido,:pais,:fecha_nac,:correo,:contrasenia,:foto_perfil,:creditos)";
    await BD.Open(sql, [nombre,apellido,pais,fecha_nac,correo,contrasenia,foto_perfil,creditos], true);
    res.status(201).json({Mensaje: "Se creo el usuario"});
})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const {id_usuario,nombre,apellido,pais,contrasenia,foto_perfil} = req.body;

    sql = "update usuario set nombre=:nombre, apellido=:apellido, pais=:pais,"+ 
            "contrasenia=:contrasenia, foto_perfil=:foto_perfil where id_usuario=:id_usuario";
    await BD.Open(sql, [nombre,apellido,pais,contrasenia,foto_perfil,id_usuario], true);
    res.status(201).json({Mensaje: "Se actualizo el usuario"});   
    /*res.status(200).json({
        "id_usuario": id_usuario,
        "nombre": nombre,
        "apellido": apellido,
        "pais": pais,
        "fecha_nac": fecha_nac,
        "correo": correo,
        "contrasenia": contrasenia,
        "foto_perfil": foto_perfil,
        "creditos": creditos
    })*/    
    
})

//DELETE
router.delete("/deleteUser/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;
    //sql = "update person set state=0 where codu=:codu";
    sql = "delete from usuario where id_usuario=:id_usuario";
    await BD.Open(sql, [id_usuario], true);

    res.status(200).json({ "Mensaje": "Usuario Eliminado" })
})


//CREATE PRODUCTO
router.post('/addProducto', async (req, res) => {
    const {nombre, precio, descripcion, foto, id_categoria, id_usuario} = req.body; //{nombre que le corresponde a cada parametro del cuerpo (tienen que ser los mismos nombres al del json)}
    
    sql = "insert into producto(nombre,precio,descripcion,foto,estado,id_categoria,id_usuario)"+ 
    "values (:nombre,:precio,:descripcion,:foto,1,:id_categoria,:id_usuario)";
    await BD.Open(sql, [nombre, precio, descripcion, foto, id_categoria, id_usuario], true);
    res.status(201).json({Mensaje: "Se agrego el producto"});
})

//GET PRODUCTOS
router.get('/getProductos', async (req, res) => {
    sql = "select * from producto where estado = 1"; //consulta sql
    let result = await BD.Open(sql, [], false); //consulta, campos que necesite la consulta, commit
    Productos = []; //arreglo
    result.rows.map(producto => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let productoEsquema = {
            "id_producto": producto[0],
            "nombre": producto[1],
            "precio": producto[2],
            "descripcion": producto[3],
            "foto": producto[4],
            "estado": producto[5],
            "id_categoria": producto[6],
            "id_usuario": producto[7],
        }
        Productos.push(productoEsquema); //agrega cada registro en formato json al arreglo Users
    })

    res.json(Productos);
})

//GET PRODUCTO POR NOMBRE
router.get("/getProducto/:nombre", async (req, res)=>{
    const { nombre } = req.params;
    sql = "select * from producto where nombre = :nombre";
    let result = await BD.Open(sql, [nombre], false);
    Productos = []; //ARREGLO DONDE SE GUARDARA EL PRODUCTO O LOS PRODUCTOS
    result.rows.map(producto => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let productoEsquema = {
            "id_producto": producto[0],
            "nombre": producto[1],
            "precio": producto[2],
            "descripcion": producto[3],
            "foto": producto[4],
            "id_categoria": producto[6],
            "id_usuario": producto[7],
        }
        Productos.push(productoEsquema); //agrega cada registro en formato json al arreglo Users
    })
    //res.send('Se obtuvo el producto buscado');
    res.status(200).json(Productos);
})

//GET PRODUCTO POR CATEGORIA
router.get("/getProductosC/:nombre", async (req, res)=>{
    const {nombre} = req.params //NOMBRE DE LA CATEGORIA
    sqlAux = "select * from categoria_producto where nombre = :nombre";
    let resultAux = await BD.Open(sqlAux, [nombre], false);
    Categorias = [];
    resultAux.rows.map(categoria => {
        let categoriaEsquema = {
            "id_categoria": categoria[0],
            "nombre": categoria[1]
        }
        Categorias.push(categoriaEsquema);
    })
    const id_categoria = JSON.stringify(Categorias[0].id_categoria); //ID DE LA CATEGORIA
    //res.send(id_categoria);
    sql = "select * from producto where id_categoria = :id_categoria";
    let result = await BD.Open(sql, [id_categoria], false);
    Productos = []; //ARREGLO DONDE SE GUARDARA EL PRODUCTO O LOS PRODUCTOS
    result.rows.map(producto => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let productoEsquema = {
            "id_producto": producto[0],
            "nombre": producto[1],
            "precio": producto[2],
            "descripcion": producto[3],
            "foto": producto[4],
            "id_categoria": producto[6],
            "id_usuario": producto[7],
        }
        Productos.push(productoEsquema); //agrega cada registro en formato json al arreglo Users
    })
    //res.send('Se obtuvo el producto buscado');
    res.status(200).json(Productos);
})

//GET PRODUCTO POR PRECIO
router.get("/getProductosP/:precio", async (req, res)=>{
    const { precio } = req.params;
    sql = "select * from producto where precio = :precio";
    let result = await BD.Open(sql, [precio], false);
    Productos = []; //ARREGLO DONDE SE GUARDARA EL PRODUCTO O LOS PRODUCTOS
    result.rows.map(producto => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let productoEsquema = {
            "id_producto": producto[0],
            "nombre": producto[1],
            "precio": producto[2],
            "descripcion": producto[3],
            "foto": producto[4],
            "id_categoria": producto[6],
            "id_usuario": producto[7],
        }
        Productos.push(productoEsquema); //agrega cada registro en formato json al arreglo Users
    })
    //res.send('Se obtuvo el producto buscado');
    res.status(200).json(Productos);
})

//GET CATEGORIAS
router.get('/getCategorias', async (req, res) => {
    sql = "select * from categoria_producto"; //consulta sql
    let result = await BD.Open(sql, [], false); //consulta, campos que necesite la consulta, commit
    Categorias = []; //arreglo
    result.rows.map(categoria => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let categoriaEsquema = {
            "id_categoria": categoria[0],
            "nombre": categoria[1]
        }
        Categorias.push(categoriaEsquema); //agrega cada registro en formato json al arreglo Categorias
    })

    res.json(Categorias);
})

//CREATE CATEGORIA
router.post('/addCategoria', async (req, res) => {
    const {nombre} = req.body; //{nombre que le corresponde a cada parametro del cuerpo (tienen que ser los mismos nombres al del json)}
    
    sql = "insert into categoria_producto(nombre) values (:nombre)";
    await BD.Open(sql, [nombre], true);
    res.status(201).json({Mensaje: "Se agrego la categoria"});
})

//GET COMENTARIOS
router.get("/getComentarios/:id_producto", async (req, res) => {
    const { id_producto } = req.params;
    sql = "select * from comentario where id_producto=:id_producto"; //consulta sql
    let result = await BD.Open(sql, [id_producto], false); //consulta, campos que necesite la consulta, commit
    Comentarios = []; //arreglo
    result.rows.map(comentario => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let Esquema = {
            "id_comentario": comentario[0],
            "contenido": comentario[1],
            "fecha": comentario[2],
            "id_producto": comentario[3],
            "id_usuario": comentario[4],
            "nombre": comentario[5]
        }
        Comentarios.push(Esquema); //agrega cada registro en formato json al arreglo Categorias
    })

    res.json(Comentarios);
})

//CREATE COMENTARIO
router.post('/addComentario', async (req, res) => {
    
    const {contenido,id_producto,id_usuario,nombre} = req.body; //{nombre que le corresponde a cada parametro del cuerpo (tienen que ser los mismos nombres al del json)}
    
    sql = "insert into comentario(contenido,id_producto,id_usuario,nombre) values (:contenido,:id_producto,:id_usuario,:nombre)";
    console.log(sql);
    await BD.Open(sql, [contenido,id_producto,id_usuario,nombre], true);
    res.status(201).json({Mensaje: "Se agrego el comentario"});
})

//GET DENUNCIAS
router.get("/getDenuncias", async (req, res) => {
    sql = "select * from denuncia"; //consulta sql
    let result = await BD.Open(sql, [], false); //consulta, campos que necesite la consulta, commit
    Denuncias = []; //arreglo
    result.rows.map(denuncia => { //el resultado de la consulta lo va a separar en filas (cada fila es un registro)
        let Esquema = {
            "id_denuncia": denuncia[0],
            "contenido": denuncia[1],
            "fecha": denuncia[2],
            "id_producto": denuncia[3],
            "id_usuario": denuncia[4],
            "nombre": denuncia[5]
        }
        Denuncias.push(Esquema); //agrega cada registro en formato json al arreglo Categorias
    })

    res.json(Denuncias);
})

//CREATE DENUNCIA
router.post('/addDenuncia', async (req, res) => {
    
    const {contenido,id_producto,id_usuario,nombre} = req.body; //{nombre que le corresponde a cada parametro del cuerpo (tienen que ser los mismos nombres al del json)}
    
    sql = "insert into denuncia(contenido,id_producto,id_usuario,nombre) values (:contenido,:id_producto,:id_usuario,:nombre)";
    console.log(sql);
    await BD.Open(sql, [contenido,id_producto,id_usuario,nombre], true);
    res.status(201).json({Mensaje: "Se agrego la denuncia"});
})


//GET ME GUSTA
router.post('/getMeGusta', async (req, res) => {
    const{id_producto,id_usuario} = req.body;
    sql = "select * from me_gusta where id_producto=:id_producto and id_usuario=:id_usuario"; //consulta sql
    let result = await BD.Open(sql, [id_producto,id_usuario], false); //consulta, campos que necesite la consulta, commit
    console.log(result.rows);

    if(result.rows.length > 0){
        res.status(201).json({
            Mensaje: "Se encontro el Me Gusta",
            DataState: {
                "estado":result.rows[0][1]
            }
        });    
    }else{
        res.json({Mensaje: "No se encontro el Me Gusta"});
    }
})

//CREATE ME GUSTA
router.post('/addMeGusta', async (req, res) => {
    
    const {estado,id_producto,id_usuario} = req.body; //{nombre que le corresponde a cada parametro del cuerpo (tienen que ser los mismos nombres al del json)}
    
    sql = "insert into me_gusta(estado,id_producto,id_usuario) values (:estado,:id_producto,:id_usuario)";
    console.log(sql);
    await BD.Open(sql, [estado,id_producto,id_usuario], true);
    res.status(201).json({Mensaje: "Se creo el me gusta"});
})
//GET ALL ME GUSTA
router.get("/getAllMeGusta/:id_producto", async (req, res)=>{
    const { id_producto } = req.params;
    sql = "select count(me_gusta.id_me_gusta) from me_gusta where estado = 1 and id_producto = :id:producto";
    let result = await BD.Open(sql, [id_producto], false);
    /*res.status(201).json({
        Mensaje: "Se encontro el me gusta",
        DataUser: {
            "contador": result.rows[0][0]
        }
    });*/
    res.json(result.rows[0][0]); //ENVIA EL NUMERO QUE CONTIENE EL CONTADOR
    //res.status(200).json(Productos);
})
//GET ALL NO ME GUSTA
router.get("/getAllNoMeGusta/:id_producto", async (req, res)=>{
    const { id_producto } = req.params;
    sql = "select count(me_gusta.id_me_gusta) from me_gusta where estado = 2 and id_producto = :id:producto";
    let result = await BD.Open(sql, [id_producto], false);
    res.json(result.rows[0][0]); //ENVIA EL NUMERO QUE CONTIENE EL CONTADOR
})

//UPDATE ME GUSTA
router.put("/updateMeGusta", async (req, res) => {
    const {estado,id_producto,id_usuario} = req.body;

    sql = "update me_gusta set estado=:estado where id_producto=:id_producto and id_usuario=:id_usuario";
    await BD.Open(sql, [estado,id_producto,id_usuario], true);
    res.status(201).json({Mensaje: "Se actualizo el estado de me gusta"}); 
    
})




//LOGIN
router.post("/signUp", async (req,res)=>{
    const{nombre, contrasenia} = req.body;

    sql = "select id_usuario, nombre, apellido, pais, contrasenia, foto_perfil, creditos from usuario where nombre=:nombre"
    let result = await BD.Open(sql,[nombre],false);
    console.log(result.rows);

    if(result.rows.length > 0){
        if (result.rows[0][4]==contrasenia) {
            res.status(201).json({
                Mensaje: "Se encontro el usuario",
                DataUser: {
                    "id_usuario": result.rows[0][0],
                    "nombre":result.rows[0][1],
                    "apellido": result.rows[0][2],
                    "pais" : result.rows[0][3],
                    "foto_perfil": result.rows[0][5],
                    "creditos": result.rows[0][6]
                }
            });    
        }else{
            res.send("contrasenia incorrecta"); //Consola del navegador
            console.log("contrasenia incorrecta") //Consola en nodejs
        }
    }else{
        res.send("No se encontro el usuario");
    }
})


module.exports = router;