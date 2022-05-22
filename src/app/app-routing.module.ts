import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignUpComponent} from './core/signup/signup.component';
import {LoginComponent} from './core/login/login.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {AuthenticationGuard} from './shared/authentication/authentication.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthenticationGuard]},
  {path: 'signup', component: SignUpComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthenticationGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule {
}
