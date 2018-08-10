import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from './user.service';
import {Router, ActivatedRoute} from '@angular/router';

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

constructor (
  private userService: UserService,
  public formBuilder: FormBuilder,
  private router: Router,
  private route: ActivatedRoute
){

  this.myForm = this.formBuilder.group({
    username: ['', Validators.compose([Validators.minLength(10), Validators.required])],
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
      this.router.navigate([this.returnUrl]);
    },
    error =>{
      console.log('something went wrong');
    }
  )
}



}
