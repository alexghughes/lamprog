import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NojqueryComponent } from './nojquery.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'nojquery', component: NojqueryComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
