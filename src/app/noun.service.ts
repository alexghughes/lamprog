import { Injectable } from '@angular/core';
import { Nouns } from './nouns';
import {Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { first } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class NounService {
   //private json = JSON.stringify({var1: 'test'});
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  //private params = 'json=' + this.json;
  private options = new RequestOptions({ headers: this.headers });
  private nounsUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getNouns(): Observable<any> {
    return this.http.get(this.nounsUrl + 'api/nouns').pipe(map(res => {res}));

    //.map(res=> res.json());
  }

  getNounsTest(): Observable<any> {
    return this.http.get(this.nounsUrl + '/api/nounstest').pipe(map(res => {res}));

  }


 send(noun:any): Observable<any>{


return this.http.post('http://localhost:3000/api/send',
     {'noun': noun},

  )
      .pipe(map(res => {return res }));

}



}
