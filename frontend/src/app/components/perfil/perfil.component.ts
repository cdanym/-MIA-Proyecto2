import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserInterface } from "../../models/user-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(public service: UserService,public router: Router) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.service.getCurrentUser();
    this.id_usuario = this.usuarioLogueado.id_usuario;
    this.nombre = this.usuarioLogueado.nombre;
    this.apellido = this.usuarioLogueado.apellido;
    this.pais = this.usuarioLogueado.pais;
    this.foto_perfil = this.usuarioLogueado.foto_perfil;
    this.creditos = this.usuarioLogueado.creditos;
  }

  usuarioLogueado: UserInterface = null;
  id_usuario: number = null;
  nombre: string = "";
  apellido: string = "";
  pais: string="";
  fecha_nac: string=null;
  correo: string="";
  contrasenia: string="";
  foto_perfil: string = "";
  creditos: number = null;
  Usuarios: UserInterface[] = [];

  confirmar: string = "";
  selectedFile: string = "";

  onFileSelected(event){
    console.log(event.target.files[0]);
    this.foto_perfil = event.target.files[0].name;
    //console.log(this.selectedFile);
  }

  actualizarUsuario(){
    if(this.nombre == "" || this.apellido == "" || this.pais == "" || this.contrasenia == ""){
      console.log("HAY CAMPOS VACIOS")
    }else{
      if(this.contrasenia == this.confirmar){
        this.service.UpdateUser(this.id_usuario,this.nombre,this.apellido,this.pais,this.contrasenia, this.foto_perfil)
        .subscribe((res:UserInterface[])=>{
          if (res['Mensaje']) {
            this.usuarioLogueado.nombre = this.nombre;
            this.usuarioLogueado.apellido = this.apellido;
            this.usuarioLogueado.pais = this.pais;
            this.usuarioLogueado.contrasenia = this.contrasenia;
            this.usuarioLogueado.foto_perfil = this.foto_perfil;
            this.service.setCurrentUser(this.usuarioLogueado);
            this.router.navigate(['/home']);
          } else {
              console.log('No se pudo actualizar los datos');
          }
        })
      }else{
        console.log("La contrasenia no coincide")
      }

      
    }
    
  }
}
