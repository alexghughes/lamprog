import { Component } from '@angular/core';
// <span><img src="./assets/lamprog3.png" alt="Lampróg" height="200" width="250"></span>
//
@Component({
  selector: 'my-app',
  template: `

<mat-toolbar>
  <div id='myRoutes'>
  <span><a routerLink="/nojquery">NoJquery</a></span>

  <!--<span><a routerLink="/users">Users</a></span>
  <span><a routerLink="/nouns">Nouns</a></span>
  <span><a routerLink="/message">Message</a></span>-->
  </div>
</mat-toolbar>

   <router-outlet></router-outlet>
  <!-- This fills the remaining space of the current row -->






  `,
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Lampróg';

}
