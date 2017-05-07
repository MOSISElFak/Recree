import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MapPage } from '../pages/map/map';
import { AddModal } from '../pages/add-modal/add-modal';
import { Place } from '../pages/place/place';
import { Logo } from '../pages/logo/logo';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import {PlaceService} from "../providers/place-service";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MapPage,
    AddModal,
    Place,
    Logo
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    MapPage,
    AddModal,
    Place,
    Logo
  ],
  providers: [
  LocalNotifications,
  ActionSheet,
  Geolocation,
    PlaceService,
    Camera, 
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
