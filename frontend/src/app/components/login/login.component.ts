import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: UserService,public router: Router) { }

  ngOnInit(): void {
  }

  nombre:string="";
  contrasenia:string="";

  //METODO QUE SE EJECUTARÁ CUANDO SE DE CLICK AL BOTON INICIAR SESION
  login() {
    if(this.nombre=="admin" && this.contrasenia=="admin"){
      console.log("Administrador")
      this.router.navigate(['/admin']);
    }else{
      this.auth.Login(this.nombre,this.contrasenia).subscribe((res) => {
        if (res['Mensaje']) {
          //ASIGNO EL JSON CON LA INFORMACION DEL USUARIO LOGUEADO A UNA VARIABLE DE TIPO UserInterface
          let DataUser: UserInterface = res['DataUser']; 
          this.auth.setCurrentUser(DataUser);
          this.router.navigate(['/home']);
  
        } else {
          console.log('Credenciales Incorrectas');
        }
      })
    }
    
  }

  //METODO PARA DIRECCIONAR A LA PAGINA DE REGISTRO
  registrar(){
    this.router.navigate(['/registrar']);
  }

}
