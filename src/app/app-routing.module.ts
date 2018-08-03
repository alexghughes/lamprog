import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NojqueryComponent } from './nojquery.component';


const routes: Routes = [
  { path: '', redirectTo: 'nojquery', pathMatch: 'full' },
  { path: 'nojquery', component: NojqueryComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
