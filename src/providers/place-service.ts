import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PlaceService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlaceService {

  eventName;
  eventDescription;
  eventLongitude;
  eventLatitude;
  imgUrl;
  date;

  constructor() {
    
  }

}
