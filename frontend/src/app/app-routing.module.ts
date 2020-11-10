import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from "./components/crud/crud.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrarComponent } from "./components/registrar/registrar.component";
import { AddproductComponent } from "./components/addproduct/addproduct.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { DetalleComponent } from "./components/detalle/detalle.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AuthGuard } from "./guards/auth.guard";
const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'crud',
      component: CrudComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'addproduct',
      component: AddproductComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'perfil',
      component: PerfilComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'detalle',
      component: DetalleComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'admin',
      component: AdminComponent,
      //canActivate:[AuthGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'registrar',
      component: RegistrarComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
