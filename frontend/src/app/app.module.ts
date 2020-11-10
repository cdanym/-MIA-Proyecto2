import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './components/crud/crud.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { UserService } from './services/user.service';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { AdminComponent } from './components/admin/admin.component';
import { CarritoComponent } from './components/carrito/carrito.component';


@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    HomeComponent,
    LoginComponent,
    RegistrarComponent,
    AddproductComponent,
    PerfilComponent,
    DetalleComponent,
    AdminComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    DetalleComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
