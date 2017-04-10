import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { ParkingService } from '../../providers/parking-service' 

declare var google;

/*
  Generated class for the Parking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html'
})


export class ParkingPage {
	@ViewChild('map_detail') mapElement: ElementRef;
  map: any;
	parking: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams, private parkingService: ParkingService) {
  	this.parking = navParams.get("parking")
  	this.parkingService.get(this.parking._id).subscribe(parking => {
  		console.log(parking)
  		this.parking = parking
  	})
  }

  loadMap(){
  	console.log("carregando mapa;;;")
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

  ionViewDidEnter(){
 	
    this.loadMap();
  }

}
