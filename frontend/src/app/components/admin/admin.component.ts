import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service"; //Metodos con los endpoint
import { UserInterface } from "../../models/user-interface"; //interfaz de usuario
import { CategoriaInterface } from "../../models/categoria-interface"; //Interfaz de categoria_producto
import { DenunciaInterface } from "../../models/denuncia-interface"; //Interfaz de la denuncia
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public service: UserService, public router: Router) { }

  ngOnInit(): void {
    this.service.GetDenuncias().subscribe((res:DenunciaInterface[])=>{
      this.Denuncias = res;
    })
  }

  nombre: string = "";
  consulta: string = "";

  Denuncias: DenunciaInterface[] = [];

  addCategoria(){
    this.service.AddCategoria(this.nombre)
      .subscribe((res: CategoriaInterface[]) => {
        if (res['Mensaje']) {
          this.nombre = "";
          this.router.navigate(['/admin']);
        } else {
            console.log('No se pudo agregar la categoria');
        }
      })
  }

  Consulta(){
    
  }

  CerrarSesion() {
    this.service.logoutAdmin();
  }


}
