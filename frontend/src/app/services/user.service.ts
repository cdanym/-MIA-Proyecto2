import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { UserInterface } from '../models/user-interface';
import { ProductInterface } from '../models/product-interface';
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,public router: Router) { 
    
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json"
  })

  //detalleProducto: ProductInterface[] = [];
  //===DETALLE PRODUCTO===
  id_producto_P: number = null;
  nombre_P: string = "";
  precio_P: number = null;
  descripcion_P: string = "";
  foto_P: string = "";
  id_categoria_P: number = null;
  id_usuario_P: number = null;

  //GET USERS
  GetUsers(){
    const url = "http://localhost:3000/getUsers";
    return this.http.get(url);
  }

  //ADD USER
  AddUser(nombre:string,apellido:string,pais:string,fecha_nac:string,correo:string,contrasenia:string,foto_perfil:string, creditos:number){
    const url = "http://localhost:3000/addUser";
    return this.http.post(
      url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT addUser
      {
        "nombre": nombre,
        "apellido": apellido,
        "pais": pais,
        "fecha_nac": fecha_nac,
        "correo": correo,
        "contrasenia": contrasenia,
        "foto_perfil": foto_perfil,
        "creditos": creditos
      },
      {headers: this.headers}
      ).pipe(map(data => data));
  }

  //UPDATE USER
  UpdateUser(id_usuario:number, nombre:string, apellido:string, pais:string, contrasenia:string, foto_perfil:string){ //codu:number
    const url = "http://localhost:3000/updateUser";
    return this.http.put(
      url,
      {
        "id_usuario": id_usuario,
        "nombre": nombre,
        "apellido": apellido,
        "pais": pais,
        "contrasenia": contrasenia,
        "foto_perfil": foto_perfil
      },
      {headers: this.headers}
    ).pipe(map(data => data));
  }

  //DELETE USER
  DeleteUser(id_usuario){
    const url = "http://localhost:3000/deleteUser/"+id_usuario;
    return this.http.delete(url).pipe(map(data => data));
  }

  //GET PRODUCTOS
  GetProductos(){
    const url = "http://localhost:3000/getProductos";
    return this.http.get(url);
  }

  //GET PRODUCTO POR NOMBRE
  GetProducto(nombre){
    const url = "http://localhost:3000/getProducto/"+nombre;
    return this.http.get(url);
  }

  //GET PRODUCTO POR CATEGORIA
  GetProductosCategoria(categoria){
    const url = "http://localhost:3000/getProductosC/"+categoria;
    return this.http.get(url);
  }

  //GET PRODUCTO POR PRECIO
  GetProductosPrecio(valor){
    const url = "http://localhost:3000/getProductosP/"+valor;
    return this.http.get(url);
  }

  //ADD PRODUCTO
  AddProducto(nombre:string, precio:number, descripcion:string, foto:string, id_categoria:number, id_usuario:number){
    const url = "http://localhost:3000/addProducto";
    return this.http.post(
      url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT addProducto
      {
        "nombre": nombre,
        "precio": precio,
        "descripcion": descripcion,
        "foto": foto,
        "id_categoria": id_categoria,
        "id_usuario": id_usuario
      },
      {headers: this.headers}
      ).pipe(map(data => data));
  }


  //GET CATEGORIAS
  GetCategorias(){
    const url = "http://localhost:3000/getCategorias";
    return this.http.get(url);
  }

  //ADD CATEGORIA
  AddCategoria(nombre:string){
    const url = "http://localhost:3000/addCategoria";
    return this.http.post(
      url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT addCategoria
      {
        "nombre": nombre
      },
      {headers: this.headers}
      ).pipe(map(data => data));
  }

  //GET COMENTARIOS
  GetComentarios(id_producto){
    const url = "http://localhost:3000/getComentarios/"+id_producto;
    return this.http.get(url);
  }

  //ADD COMENTARIO
  AddComentario(contenido:string,id_producto:number,id_usuario:number,nombre:string){
    const url = "http://localhost:3000/addComentario";
    return this.http.post(
      url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT addComentario
      {
        "contenido": contenido,
        "id_producto": id_producto,
        "id_usuario": id_usuario,
        "nombre": nombre
      },
      {headers: this.headers}
      ).pipe(map(data => data));
  }

  //GET DENUNCIAS
  GetDenuncias(){
    const url = "http://localhost:3000/getDenuncias";
    return this.http.get(url);
  }

  //ADD DENUNCIAS
  AddDenuncia(contenido:string,id_producto:number,id_usuario:number,nombre:string){
    const url = "http://localhost:3000/addDenuncia";
    return this.http.post(
      url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT addDenuncia
      {
        "contenido": contenido,
        "id_producto": id_producto,
        "id_usuario": id_usuario,
        "nombre": nombre
      },
      {headers: this.headers}
      ).pipe(map(data => data));
  }

   //GET MEGUSTA
  GetMeGusta(id_producto,id_usuario){
    const url = "http://localhost:3000/getMeGusta";
    return this.http.post(url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT getMeGusta
      {
        "id_producto": id_producto,
        "id_usuario": id_usuario
      },
      {headers: this.headers }
      ).pipe(map(data => data));
  }

  //ADD ME GUSTA
  AddMeGusta(estado:number,id_producto:number,id_usuario:number){
    const url = "http://localhost:3000/addMeGusta";
    return this.http.post(
      url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT addMeGusta
      {
        "estado": estado,
        "id_producto": id_producto,
        "id_usuario": id_usuario
      },
      {headers: this.headers}
      ).pipe(map(data => data));
  }
  //GET ALL ME GUSTA
  GetAllMeGusta(id_producto){
    const url = "http://localhost:3000/getAllMeGusta/"+id_producto;
    return this.http.get(url);
  }
  //GET ALL NO ME GUSTA
  GetAllNoMeGusta(id_producto){
    const url = "http://localhost:3000/getAllNoMeGusta/"+id_producto;
    return this.http.get(url);
  }

  //UPDATE ME GUSTA
  UpdateMeGusta(estado:number,id_producto:number,id_usuario:number){
    const url = "http://localhost:3000/updateMeGusta";
    return this.http.put(
      url,
      {
        "estado": estado,
        "id_producto": id_producto,
        "id_usuario": id_usuario
      },
      {headers: this.headers}
    ).pipe(map(data => data));
  }


  //LOGIN
  Login(nombre,contrasenia) {
    const url = "http://localhost:3000/signUp"; //ENDPOINT PARA LOGEARSE

    return this.http.post(url,
      //CUERPO EN FORMATO JSON QUE SE ENVIARA AL ENDPOINT signUp
      {
        "nombre": nombre,
        "contrasenia": contrasenia
      }
      , { headers: this.headers })
      .pipe(map(data => data));
  }

  //SET CURRENT USER
  setCurrentUser(user: UserInterface) {
    let user_string = JSON.stringify(user);
    localStorage.setItem('UsuarioLogueado', user_string);
  }

  //GET CURRENT USER
  getCurrentUser() {
    let userCurrent = localStorage.getItem('UsuarioLogueado');
    if (!isNullOrUndefined(userCurrent)) {
      let user_json = JSON.parse(userCurrent);
      return user_json;
    } else {
      return null;
    }
  }

  //LOGOUT
  logout() {
    localStorage.removeItem("UsuarioLogueado");
    this.router.navigate(['/login']);
  }

  //LOGOUT ADMIN
  logoutAdmin() {
    this.router.navigate(['/login']);
  }  

}

