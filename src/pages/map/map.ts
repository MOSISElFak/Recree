import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { AddModal } from '../add-modal/add-modal';
import { Storage } from '@ionic/storage';
import {PlaceService} from "../../providers/place-service";
import { Place } from '../place/place';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { Logo } from '../logo/logo';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AboutPage } from '../about/about';



declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

    map;
    markers = [];
    isRangeOn = false;
    range: number = 2000;
    click3Time : number = 1;
    date: Date;


  constructor(public navCtrl: NavController,
              public platform: Platform,
              public modalCtrl: ModalController,
              public placeData: PlaceService,
              public storage: Storage,
              private geolocation: Geolocation,
              private localNotifications: LocalNotifications

                            ) {



  platform.ready().then(() => {
            this.initMap();
            this.movementTracker();
            this.saveDate();

        });


  }

ionViewWillEnter(){
    console.log("Map will enter");

    if(this.map != null){
      console.log("Markers updated on Map will enter");
      //this.loadMarkers();
      this.initMap();

    }
    
}

 public runAddModal(position) {

   this.navCtrl.push(AddModal, {clickLocation : position});

 }



initMap() {

        console.log("Map init");

        // Downtown Nish
        let startLocation = new google.maps.LatLng(43.3209813,21.9053268);

        // Create a map object and specify the DOM element for display.
          this.map = new google.maps.Map(document.getElementById('map'), {
          center: startLocation,
          scrollwheel: false,
          zoom: 15
        });


        this.map.addListener('click', e => {
          this.runAddModal(e.latLng);
        });

        this.loadMarkers();





      }


public addMarker(location, markerID){

  let position = {lat: 43.316787, lng: 21.924696};

  let marker = new google.maps.Marker({
          title: "Event",
          position: location,
          map: this.map

        });
  marker.set("id", markerID);

  marker.addListener("click", () =>{
      let markerID = marker.get("id");
      this.navCtrl.push(Place, {id : markerID});
  })
  this.markers.push(marker);

}

public loadMarkers(){

this.hideMarkers();

this.storage.ready().then(() => {
  this.storage.forEach((value, key, iteration) =>{

    this.addMarker({lat: value.eventLatitude, lng: value.eventLongitude}, key);

  });
});

}



public clearMarkers(){

  this.storage.clear();
  console.log("cleared keys");

  for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

  
 }

public hideMarkers(){

for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

}



public locateMe(){

let infoWindow = new google.maps.InfoWindow;

let geoConfig: GeolocationOptions = {
        maximumAge: 100000,
        timeout: 7500,
        enableHighAccuracy: true,
    };

this.geolocation.getCurrentPosition(geoConfig).then((position) =>{

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };


            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(this.map);
            this.map.setCenter(pos);

}, (reason) =>{
  console.log("My Location not found: " + reason);
});

}


public movementTracker(){


  this.geolocation.watchPosition().subscribe( (data) => {

  console.log("Position Changed");

  this.storage.ready().then(() => {
  this.storage.forEach((value, key, iteration) =>{

  let myPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
  let eventPosition = new google.maps.LatLng(value.eventLatitude,value.eventLongitude);

  let distance = google.maps.geometry.spherical.computeDistanceBetween(eventPosition, myPosition);

if(distance <= 500){

console.log("Found close position within " + distance + "m ");

  // Schedule a single notification
this.localNotifications.schedule({
  id: 1,
  text: value.eventName
  
});

}

  });
});


  })

}


public showHide(){
  let rangeBar = document.getElementById("rangeSelector");
  let map = document.getElementById("map");

  if(this.isRangeOn){
    rangeBar.style.display = "none";
    this.isRangeOn = false;

    map.style.height = "100%";

  }else{
    rangeBar.style.display = "block";
    this.isRangeOn = true;

    map.style.height = "90%";
  }

  console.log(this.range);
  this.filterEvents();
  
}


public filterEvents(){


this.hideMarkers();

var map = this.map;

let geoConfig: GeolocationOptions = {
        maximumAge: 100000,
        timeout: 7500,
        enableHighAccuracy: true,
    };

this.geolocation.getCurrentPosition(geoConfig).then((data) =>{


  this.storage.ready().then(() => {
  this.storage.forEach((value, key, iteration) =>{

  let myPosition = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
  let eventPosition = new google.maps.LatLng(value.eventLatitude,value.eventLongitude);

  let distance = google.maps.geometry.spherical.computeDistanceBetween(eventPosition, myPosition);

if(distance <= this.range){

this.addMarker({lat: value.eventLatitude, lng: value.eventLongitude}, key);

}

  });
});


            

}, (reason) =>{
  console.log("My Location not found: " + reason);
});

}


public saveDate(){

    this.date = new Date();
    this.date.getDate();

    window.localStorage.setItem("date", `${this.date}`);

    console.log(window.localStorage.getItem("date"));

}

public printTest(){

  if(this.click3Time == 3){

    console.log("Easter egg!!!");
    this.navCtrl.push(AboutPage, {date : this.date});

  }else{
    this.click3Time++;
  }
  
}


}
