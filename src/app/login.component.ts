import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from './user.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// export interface DialogData {
//   email: string;
//   password: string;
// }

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model: any = {
    username: '',
    password: ''
  }



  myForm: FormGroup;

  returnUrl: string;

  error = '';

  closeDialog: boolean = false;

  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<LoginComponent>,
    //  @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.myForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })



  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.userService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        console.log(data);
        this.closeDialog = true;
        this.dialogRef.close();
        this.router.navigate(['/dashboard']);
      },

      error => {
        this.error = 'Username or Password is incorrect';
        console.log(this.error);
      }

      )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




}
