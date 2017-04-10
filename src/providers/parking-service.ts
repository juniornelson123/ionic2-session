import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Session } from '../config/session'
import { User } from '../models/user'

import 'rxjs/add/operator/map';

/*
  Generated class for the ParkingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParkingService implements OnInit {
	baseUrl = 'http://localhost:3000';
  user = new User();
  session = new Session();
  
  constructor(public http: Http) {
  }

  ngOnInit(){
    
  }

  all(header: Headers){
    return this.http.get(this.baseUrl+"/parkings", { headers: header }).map(res => res.json());
  }
}