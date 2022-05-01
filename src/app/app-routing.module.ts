import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';

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
