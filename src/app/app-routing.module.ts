import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NojqueryComponent } from './nojquery.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'nojquery', pathMatch: 'full'},
  { path: 'nojquery', component: NojqueryComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
