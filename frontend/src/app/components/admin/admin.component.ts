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
    if(this.consulta == "Top 10 productos mas vendidos"){
      console.log("Consulta 1");
      
    }else if(this.consulta == 'Top 10 de productos que más “me gusta” han tenido'){
      console.log("Consulta 2");

    }else if(this.consulta == 'Top 10 productos con más “no me gusta” han tenido'){
      console.log("Consulta 3");

    }else if(this.consulta == 'Top 10 clientes con más y menos créditos'){
      console.log("Consulta 4");

    }else if(this.consulta == 'Top 10 clientes que más denuncias han hecho'){
      console.log("Consulta 5");

    }else if(this.consulta == 'Top 10 clientes que más publicaciones han hecho'){
      console.log("Consulta 6")

    }else if(this.consulta == 'Top 10 de países con más crédito y productos a la venta'){
      console.log("Consulta 7");

    }
    
  }

  CerrarSesion() {
    this.service.logoutAdmin();
  }


}
