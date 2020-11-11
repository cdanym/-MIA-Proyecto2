import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserInterface } from "../../models/user-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(public crudService: UserService,public router: Router) { }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe((res:UserInterface[])=>{
      this.Usuarios =res; 
    })
  }

  id_usuario: string = "";
  nombre: string = "";
  apellido: string = "";
  pais: string="";
  fecha_nac: string=null;
  correo: string="";
  contrasenia: string="";
  confirmar: string="";
  foto_perfil: string =null;
  creditos: number = null;
  Usuarios: UserInterface[] = [];

  addUser() {
    if(this.nombre == "" || this.apellido == "" || this.pais == "" || this.contrasenia == "" || this.confirmar == ""){
      console.log("HAY CAMPOS VACIOS")
    }else{
      if(this.contrasenia == this.confirmar){
        this.crudService.AddUser(this.nombre, this.apellido, this.pais, null, this.correo, this.contrasenia, this.foto_perfil, 1000)
        .subscribe((res: UserInterface[]) => {
          if (res['Mensaje']) {
            this.router.navigate(['/crud']);
            this.Usuarios = res;
            this.id_usuario = "";
            this.nombre = "";
            this.apellido = "";
            this.pais = "";
            this.fecha_nac = null;
            this.correo = "";
            this.contrasenia ="";
            this.foto_perfil = null;
            this.creditos = null;
          } else {
              console.log('No se pudo crear el usuario');
          }
        })
      }else{
        console.log("La contrasenia no coincide")
      }
    }  
    
  }


}
