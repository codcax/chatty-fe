import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './core/authentication/signup/signup.component';
import {LoginComponent} from './core/authentication/login/login.component';

const routes: Routes = [
  {path: '', component: SignUpComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
