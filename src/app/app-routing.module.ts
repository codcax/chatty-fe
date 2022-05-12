import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SignUpComponent} from './core/signup/signup.component';
import {LoginComponent} from './core/login/login.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
