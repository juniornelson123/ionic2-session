import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';
import { ParkingService } from '../../providers/parking-service' 
import { Headers } from '@angular/http';



import { LoginPage } from '../login/login';

import { Session } from '../../config/session';
import { Parking } from '../../models/parking'
declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  parkings: Parking[];
  session = new Session
  user: any; 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public parkingService: ParkingService) {
      this.user = this.session.currentUser()
      let headers =  new Headers({"token": this.user.token})
      parkingService.all(headers).subscribe(parkings => {
        console.log(parkings)
        this.parkings = parkings
      }, erro => {
        console.log("erro parkings")

      })
  }
 
  loadMap(){
 	  let options = {
      enableHighAccuracy: true
    };
    
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      console.log(this.map.setCenter(latLng))
      //this.map.center()
    }).catch((err) => {
      alert(err);
    })
    
  }

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };
    
      this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      console.log('lat: ' + position.coords.latitude + ', lon: ' + position.coords.longitude)
      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      
      console.log(this.map.setCenter(latLng))
      //this.map.center()
    }).catch((err) => {
      alert(err);
    })
    
  }
  
  remove(){
    this.session.remove()
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidEnter(){
 	
    this.loadMap();
  }
}
