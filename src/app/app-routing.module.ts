import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearusuarioComponent } from './crearusuario/crearusuario.component';
import {LoginComponent}  from './login/login.component'
import {UserGuardGuard}  from './aunthenticate/user-guard.guard'

const routes: Routes = [

  {
    path:'',
    redirectTo:'login_usuario',
    pathMatch:'full'
  },
  {
    path:'crear_usuario',
    component: CrearusuarioComponent,
    canActivate:[UserGuardGuard]
  },
  {
    path:'login_usuario',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
