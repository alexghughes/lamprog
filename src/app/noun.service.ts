import { Injectable } from '@angular/core';
import { Nouns } from './nouns';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";



@Injectable()
export class NounService {
   //private json = JSON.stringify({var1: 'test'});
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  //private params = 'json=' + this.json;
  private options = new RequestOptions({ headers: this.headers });
  private nounsUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  getNouns(): Observable<any> {
    return this.http.get(this.nounsUrl + 'api/nouns').pipe(map(res => {res.json()}));

    //.map(res=> res.json());
  }

  getNounsTest(): Observable<any> {
    return this.http.get(this.nounsUrl + '/api/nounstest').pipe(map(res => {res.json()}));

  }


 send(noun:any): Observable<any>{

// this.http.post('http://localhost:3000/api/send',
//      {'noun': noun},
//
//     {
//       headers: this.headers
//     })
//       .subscribe(
//         res => {
//           console.log(res);
//         },
//         err => {
//           console.log("Error occured");
//         }
//       );

return this.http.post('http://localhost:3000/api/send',
     {'noun': noun},

    {
      headers: this.headers
    })
      .pipe(map(res => {return res.json()}));

}



}
