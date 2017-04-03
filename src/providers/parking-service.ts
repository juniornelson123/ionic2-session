import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the ParkingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParkingService {
	baseUrl = 'http://localhost:3000';
  
  constructor(public http: Http) {

  }

  all(){
    return this.http.get(this.baseUrl+"/parkings")
      .map(res => res.json());
  }
}
