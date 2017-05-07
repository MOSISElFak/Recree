import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Logo } from '../logo/logo';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  date: Date;


  constructor(public navCtrl: NavController,
              private camera: Camera,
              private localNotifications: LocalNotifications,
              private socialSharing: SocialSharing,
              public navParams: NavParams) {

    this.date = navParams.get("date");


  }


}
