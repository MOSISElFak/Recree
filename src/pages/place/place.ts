import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PlaceService} from "../../providers/place-service";
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';



@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class Place {

  eventID;

  constructor(public navCtrl: NavController,
  			  public navParams: NavParams,
  			  public storage: Storage,
  			  public place : PlaceService,
  			  private socialSharing: SocialSharing,
          private actionSheet: ActionSheet) {


  }

  ionViewDidLoad() {
  	
    console.log('ionViewDidLoad Place');

    this.eventID = this.navParams.get("id");

	this.storage.ready().then(() => {

	
	this.storage.get(this.eventID).then((placeParam : PlaceService) =>{

	this.place = placeParam;

	})
	});


  }

public sharePlace(){

  let buttonLabels = ['Share via Facebook', 'Share via Twitter'];

const options: ActionSheetOptions = {
  title: 'What do you want with this image?',
  subtitle: 'Choose an action',
  buttonLabels: buttonLabels,
  addCancelButtonWithLabel: 'Cancel',
  addDestructiveButtonWithLabel: 'Delete',
  androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
  destructiveButtonLast: true
};

this.actionSheet.show(options).then((buttonIndex: number) => {
 
  if(buttonIndex == 1){

    this.socialSharing.shareViaFacebook(this.place.eventName, this.place.imgUrl);
    this.navCtrl.pop();
    
  }else if(buttonIndex == 2){

    this.socialSharing.shareViaTwitter(this.place.eventName, this.place.imgUrl);
    this.navCtrl.pop();
  }



});



}

public deletePlace(){
	
	this.storage.ready().then(() => {

		this.storage.remove(this.eventID);
		this.navCtrl.pop();
	});

}



}


