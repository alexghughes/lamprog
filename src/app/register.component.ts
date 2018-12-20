import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from './user.service';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl} from '@angular/forms';

@Component({
  //moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  model: any = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  loading = false;
  myForm: FormGroup;
  pathname = '';

  error = '';

  constructor(
    private router: Router,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){

    this.myForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    },{
      validator: this.matchPassword
    })


  }

  register() {

    //this.loading = true;

    this.userService.create(this.model)
    .subscribe(
      data => {

        this.userService.login(this.model.username, this.model.password)
        .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/nojquery']);
        },

        error => {
          this.error = 'Username or Password is incorrect';
          console.log(this.error);
        }

        )
      //  this.router.navigate(['login']);
      },
      error => {
        this.loading = false;
      }
    )
  }

  matchPassword(AC: AbstractControl) {
   let password = AC.get('password').value;
   let confirmPassword = AC.get('confirmPassword').value;
   if(password !== confirmPassword){
     AC.get('confirmPassword').setErrors({MatchPassword: true})
   }else{
     return null;
   }
  //  console.log(this.model.password);
  //  console.log(this.model.confirmPassword)

  }



}
