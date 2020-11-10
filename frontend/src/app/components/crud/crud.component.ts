import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"; //Metodos con los endpoint
import { UserInterface } from "../../models/user-interface"; //interfaz de usuario

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor(public crudService: UserService) { }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe((res:UserInterface[])=>{
      this.Usuarios =res;
      //console.log(this.Usuarios[0].username);
    })
  }

  id_usuario: string = "";
  nombre: string = "hola";
  apellido: string = "";
  pais: string="";
  fecha_nac: string=null;
  correo: string="";
  contrasenia: string="";
  foto_perfil: string =null;
  creditos: string = "";
  Usuarios: UserInterface[] = [];

  addUser() {
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

  updateUser(){
    /*this.crudService.UpdateUser(this.id_usuario,this.nombre,this.apellido,this.creditos)
    .subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
      this.id_usuario = "";
      this.nombre = "";
      this.apellido = "";
      this.creditos = "";
    })*/
  }

  deleteUser(codu){
    this.crudService.DeleteUser(codu).subscribe((res:UserInterface[])=>{
      this.Usuarios = res;
    })
  }

  CerrarSesion() {
    this.crudService.logout();
  }

}
