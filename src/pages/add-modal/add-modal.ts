import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PlaceService} from "../../providers/place-service";
import { MapPage } from '../map/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-modal',
  templateUrl: 'add-modal.html',
})
export class AddModal {




  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public viewCtrl: ViewController,
   public storage: Storage,
   public place: PlaceService,
   public camera: Camera) {

    place.eventLatitude = navParams.get("clickLocation").lat();
    place.eventLongitude = navParams.get("clickLocation").lng();

}
  ionViewDidLoad() {
    console.log('Modal loaded');
  }


  close(){

  	this.navCtrl.pop();
  }


  public save(){

    this.storage.ready().then(() => {


    this.storage.length().then( (num) =>{
      // Starts from 0
      num++;

      this.storage.set('place' + num, this.place);
      this.navCtrl.pop();

    })



  });
  
    

  }

public takePhoto(){

  let options: CameraOptions = {
  quality: 60,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

  this.camera.getPicture(options).then( (imageData) => {

    this.place.imgUrl = 'data:image/jpeg;base64,' + imageData;

  })

}



}
