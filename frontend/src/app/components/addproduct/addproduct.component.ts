import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserInterface } from "../../models/user-interface";
import { ProductInterface } from "../../models/product-interface"; //interfaz de producto
import { CategoriaInterface } from "../../models/categoria-interface"; //interfaz de categoria producto
import { Router } from "@angular/router";

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(public service: UserService, public router: Router) { }

  ngOnInit(): void {
    this.service.GetCategorias().subscribe((res:CategoriaInterface[])=>{
      this.Categorias = res;
    })

    this.usuarioLogueado = this.service.getCurrentUser();
    this.id_usuario = this.usuarioLogueado.id_usuario;
    console.log(this.usuarioLogueado.id_usuario); //MUESTRA EL ID DEL USUARIO LOGUEADO
  }

  usuarioLogueado: UserInterface = null;

  id_producto: string = "";
  nombre: string = "";
  precio: number = null;
  descripcion: string = "";
  foto: string = "";
  id_categoria: number = null; //id de la categoria a la que pertenecerá el producto
  id_usuario: number = null; //id del usuario que esta logueado

  Categorias: CategoriaInterface[] = [];
  categoria: string = "";

  selectedFile: string = "";

  onFileSelected(event){
    console.log(event.target.files[0]);
    this.foto = event.target.files[0].name;
    //console.log(this.selectedFile);
  }

  addProducto() {

    for ( var i = 0; i < this.Categorias.length; i++){
      if (this.Categorias[i].nombre == this.categoria) {
        this.id_categoria = this.Categorias[i].id_categoria
        console.log(this.Categorias[i]); //MUESTRA LA INFO DE LA CATEGORIA SELECCIONADA
      }
    }

    this.service.AddProducto(this.nombre, this.precio, this.descripcion, this.foto, this.id_categoria, this.usuarioLogueado.id_usuario)
      .subscribe((res: ProductInterface[]) => {
        if (res['Mensaje']) {
          this.id_producto = "";
          this.nombre = "";
          this.precio = null;
          this.descripcion = "";
          this.foto = "";
          this.id_categoria = null;
          this.id_usuario = null;

          this.router.navigate(['/home']);
        } else {
            console.log('No se pudo agregar el producto');
        }
      })
  }

}
