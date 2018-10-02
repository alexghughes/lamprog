import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent} from './login.component';


@Component({
  //moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {


  constructor(public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      height: '50%',
      data: {}
    });

}

}
