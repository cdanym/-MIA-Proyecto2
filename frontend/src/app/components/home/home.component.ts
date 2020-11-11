import { Component, OnInit} from '@angular/core';
import { UserService } from "../../services/user.service"; //Metodos con los endpoint
import { ProductInterface } from "../../models/product-interface"; //interfaz de producto
import { CategoriaInterface } from "../../models/categoria-interface"; //interfaz de categoria producto
import { UserInterface } from 'src/app/models/user-interface';
import { CarritoInterface } from "../../models/carrito-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public service: UserService, public router: Router) { }

  ngOnInit(): void {
    this.service.GetProductos().subscribe((res:ProductInterface[])=>{
      this.Productos = res;
    })
    
    this.service.GetCategorias().subscribe((res:CategoriaInterface[])=>{
      this.Categorias = res;
    })

    this.usuarioLogueado = this.service.getCurrentUser();
  }

  usuarioLogueado: UserInterface = null;

  id_producto: number = null;
  nombre: string = "";
  precio: number = null;
  descripcion: string = "";
  foto: string = "";
  id_categoria: number = null;
  id_usuario: number = null;
  Productos: ProductInterface[] = [];
  ProductoSeleccionado: ProductInterface = null;
  Categorias: CategoriaInterface[] = [];

  categoria: string = "";
  valor: string = "";

  getDataProducto(id_producto,nombre,precio,descripcion,foto,id_categoria,id_usuario){
    this.service.id_producto_P = id_producto;
    this.service.nombre_P = nombre;
    this.service.precio_P = precio;
    this.service.descripcion_P = descripcion;
    this.service.foto_P = foto;
    this.service.id_categoria_P = id_categoria;
    this.service.id_usuario_P = id_usuario;
    
    this.router.navigate(['/detalle']);
  }

  addCarrito(id_producto,nombre,precio,descripcion,foto){
    this.service.AddCarrito(nombre, precio, foto, descripcion, this.usuarioLogueado.id_usuario, id_producto)
      .subscribe((res: CarritoInterface[]) => {
        if (res['Mensaje']) {
          console.log("Se agrego el producto al carrito");
        } else {
            console.log('No se pudo agregar el producto al carrito');
        }
      })
  }

  buscarProducto(){
    this.service.GetProducto(this.nombre).subscribe((res:ProductInterface[])=>{
      this.Productos = res;
    })
  }

  buscarPorCategoria(){
    this.service.GetProductosCategoria(this.categoria).subscribe((res:ProductInterface[])=>{
      this.Productos = res;
    })
  }

  buscarPorPrecio(){
    this.service.GetProductosPrecio(this.valor).subscribe((res:ProductInterface[])=>{
      this.Productos = res;
    })
  }

  addProduct(){
    this.router.navigate(['/addproduct']);
  }

  perfil(){
    this.router.navigate(['/perfil']);
  }

  carrito(){
    this.router.navigate(['./crud']);
  }

  CerrarSesion() {
    this.service.logout();
  }


}
