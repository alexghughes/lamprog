import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
// <span><img src="./assets/lamprog3.png" alt="Lampróg" height="200" width="250"></span>
//
@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit, DoCheck {
  title = 'Lampróg';
   public currentUser: boolean;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
  }


  ngDoCheck() {
    this.currentUser = this.userService.isLoggedIn();

  }





}
