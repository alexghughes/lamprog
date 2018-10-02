import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from './user';

import { map } from "rxjs/operators";

@Injectable()

export class UserService {

  private url = 'http://localhost:3000';

  constructor(private http: Http) { }

  create(user: User) {

    return this.http.post(this.url + '/api/users/register', user);
  }

  login(username: string, password: string){

    return this.http.post(this.url + '/api/users/authenticate', {username: username, password: password})
    .pipe(map(user => {
      if(user){
        console.log('1');
        localStorage.setItem('currentUser', user["_body"]);
      }
      return user;
    }));
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') != null;
  }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      }

}
