import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"; //Metodos con los endpoint
import { UserInterface } from "../../models/user-interface"; //interfaz de usuario
import { CarritoInterface } from "../../models/carrito-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor(public crudService: UserService,public router: Router) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.crudService.getCurrentUser();

    this.crudService.GetCarrito(this.usuarioLogueado.id_usuario).subscribe((res:CarritoInterface[])=>{
      this.Carritos = res;
    });
  }

  usuarioLogueado: UserInterface = null;

  id_usuario: string = "";

  Carritos: CarritoInterface[] = [];

  deleteCarrito(id_usuario,id_producto){
    this.crudService.DeleteCarrito(id_usuario,id_producto).subscribe((res)=>{
      //this.Carritos = res;
    });
    console.log("Se removio el producto de tu carrito");

    this.crudService.GetCarrito(this.usuarioLogueado.id_usuario).subscribe((res:CarritoInterface[])=>{
      this.Carritos = res;
    });
    this.router.navigate(['/crud']);
  }

  /*addUser() {
    this.crudService.AddUser(this.nombre, this.apellido, this.pais, this.fecha_nac, this.correo, this.contrasenia, this.foto_perfil, 1000)
      .subscribe((res: UserInterface[]) => {
        this.Usuarios = res;
        this.id_usuario = "";
        this.nombre = "";
        this.apellido = "";
        this.pais = "";
        this.fecha_nac = null;
        this.correo = "";
        this.contrasenia ="";
        this.foto_perfil = null;
        this.creditos = "";
      })
  }

  getDataUser(id_usuario,nombre,apellido,creditos){
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.creditos = creditos;
  }


  deleteUser(codu){
    this.crudService.DeleteUser(codu).subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
    })
  }*/

  CerrarSesion() {
    this.crudService.logout();
  }

}
