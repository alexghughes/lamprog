import { Component, OnInit } from '@angular/core';
import {User} from './user';
@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  user = {};

  constructor(){}


  ngOnInit(){
    let tokenGetter = JSON.parse(localStorage.getItem('currentUser'));
    console.log(tokenGetter);

    this.user = {
      'username': tokenGetter.username,
      'email': tokenGetter.email
    }
  }

  openDialog(): void {

}

}
