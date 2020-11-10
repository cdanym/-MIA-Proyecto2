import { Component, OnInit} from '@angular/core';
import { UserService } from "../../services/user.service";
import { UserInterface } from "../../models/user-interface";
import { ProductInterface } from "../../models/product-interface";
import { ComentarioInterface } from "../../models/comentario-interface";
import { DenunciaInterface } from "../../models/denuncia-interface";
import { MeGustaInterface } from "../../models/megusta-interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(public service: UserService,public router: Router) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.service.getCurrentUser();

    this.id_producto = this.service.id_producto_P;
    this.nombre = this.service.nombre_P;
    this.precio = this.service.precio_P;
    this.descripcion = this.service.descripcion_P;
    this.foto = this.service.foto_P;
    this.id_categoria = this.service.id_categoria_P;
    this.id_usuario = this.service.id_usuario_P;
    this.service.GetComentarios(this.id_producto).subscribe((res:ComentarioInterface[])=>{
      this.Comentarios = res;
    })

    console.log(this.usuarioLogueado.id_usuario, this.usuarioLogueado.nombre, this.id_producto);

    this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
      this.contadorMeGusta = res;
    })

    this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
      this.contadorNoMeGusta = res;
    })

  }

  usuarioLogueado: UserInterface = null;

  id_producto: number = null;
  nombre: string;
  precio: number = 350;
  descripcion: string = "Descripcion de prueba";
  foto: string = "";
  id_categoria: number = null; //id de la categoria a la que pertenecerá el producto
  id_usuario: number = null; //id del usuario que esta logueado

  comentario: string = "";
  Comentarios: ComentarioInterface[] = [];
  denuncia: string = "";

  estado: number = 0;
  contadorMeGusta: number = 0;
  contadorNoMeGusta: number = 0;

  addCarrito(){

  }

  meGusta(){
    this.service.GetMeGusta(this.id_producto,this.usuarioLogueado.id_usuario).subscribe((res)=>{
      if(res['DataState']){
        let DataState: MeGustaInterface = res['DataState'];
        if(DataState.estado == 0){
          console.log("No le has dado me gusta a este producto");
          //CAMBIAR ESTADO = 1
          this.estado = 1;
          this.service.UpdateMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
          .subscribe((res: MeGustaInterface[]) => {
            if (res['Mensaje']) {
              this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorMeGusta = res;
              })
              this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorNoMeGusta = res;
              })
            }else{
                console.log('No se pudo obtener el total de me gusta');
            }
          })
        }else if(DataState.estado == 1){
          console.log("Ya has dado me gusta a este produccto");
          //CAMBIAR ESTADO = 0
          this.estado = 0;
          this.service.UpdateMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
          .subscribe((res: MeGustaInterface[]) => {
            if (res['Mensaje']) {
              this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorMeGusta = res;
              })
              this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorNoMeGusta = res;
              })
            }else{
                console.log('No se pudo obtener el total de me gusta');
            }
          })
        }else if(DataState.estado == 2){
          console.log("Ya has dado no me gusta a este producto");
          //CAMBIAR ESTADO = 1
          this.estado = 1;
          this.service.UpdateMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
          .subscribe((res: MeGustaInterface[]) => {
            if (res['Mensaje']) {
              this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorMeGusta = res;
              })
              this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorNoMeGusta = res;
              })
            }else{
                console.log('No se pudo obtener el total de me gusta');
            }
          })
        }
        //console.log(DataState.estado);
      }else{
        console.log(res);
        //CREAR EL ME GUSTA CON EL USUARIO LOGUEADO PARA EL PRODUCTO QUE ESTA VIENDO
        //ESTADO = 1
        this.estado = 1;
        this.service.AddMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
        .subscribe((res: MeGustaInterface[]) => {
          if (res['Mensaje']) {
            this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
              this.contadorMeGusta = res;
            })
          }else{
              console.log('No se pudo obtener el total de me gusta');
          }
        })
      }
    })
  }

  noMeGusta(){
    this.service.GetMeGusta(this.id_producto,this.usuarioLogueado.id_usuario).subscribe((res)=>{
      if(res['DataState']){
        let DataState: MeGustaInterface = res['DataState'];
        if(DataState.estado == 0){
          console.log("No le has dado me gusta a este producto");
          //CAMBIAR ESTADO = 2
          this.estado = 2;
          this.service.UpdateMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
          .subscribe((res: MeGustaInterface[]) => {
            if (res['Mensaje']) {
              this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorNoMeGusta = res;
              })
              this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorMeGusta = res;
              })
            }else{
                console.log('No se pudo obtener el total de no me gusta');
            }
          })
        }else if(DataState.estado == 1){
          console.log("Ya has dado me gusta a este produccto");
          //CAMBIAR ESTADO = 2
          this.estado = 2;
          this.service.UpdateMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
          .subscribe((res: MeGustaInterface[]) => {
            if (res['Mensaje']) {
              this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorNoMeGusta = res;
              })
              this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorMeGusta = res;
              })
            }else{
                console.log('No se pudo obtener el total de no me gusta');
            }
          })
        }else if(DataState.estado == 2){
          console.log("Ya has dado no me gusta a este producto");
          //CAMBIAR ESTADO = 0
          this.estado = 0;
          this.service.UpdateMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
          .subscribe((res: MeGustaInterface[]) => {
            if (res['Mensaje']) {
              this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorNoMeGusta = res;
              })
              this.service.GetAllMeGusta(this.id_producto).subscribe((res:number)=>{
                this.contadorMeGusta = res;
              })
            }else{
                console.log('No se pudo obtener el total de no me gusta');
            }
          })
        }
        //console.log(DataState.estado);
      }else{
        console.log(res);
        //CREAR EL ME GUSTA (NO ME GUSTA) CON EL USUARIO LOGUEADO PARA EL PRODUCTO QUE ESTA VIENDO
        //ESTADO = 2
        this.estado = 2;
        this.service.AddMeGusta(this.estado,this.id_producto,this.usuarioLogueado.id_usuario)
        .subscribe((res: MeGustaInterface[]) => {
          if (res['Mensaje']) {
            this.service.GetAllNoMeGusta(this.id_producto).subscribe((res:number)=>{
              this.contadorNoMeGusta = res;
            })
          }else{
              console.log('No se pudo obtener el total de no me gusta');
          }
        })
      }
    })
  }


  addComentario(){
    this.service.AddComentario(this.comentario,this.id_producto,this.usuarioLogueado.id_usuario,this.usuarioLogueado.nombre)
      .subscribe((res: ComentarioInterface[]) => {
        if (res['Mensaje']) {
          this.comentario = "";
          this.service.GetComentarios(this.id_producto).subscribe((res:ComentarioInterface[])=>{
            this.Comentarios = res;
          })
        } else {
            console.log('No se pudo agregar el comentario');
        }
      })
  }

  addDenuncia(){
    this.service.AddDenuncia(this.denuncia,this.id_producto,this.usuarioLogueado.id_usuario,this.usuarioLogueado.nombre)
      .subscribe((res: DenunciaInterface[]) => {
        if (res['Mensaje']) {
          this.denuncia = "";
        } else {
            console.log('No se pudo agregar la denuncia');
        }
      })
  }

}
