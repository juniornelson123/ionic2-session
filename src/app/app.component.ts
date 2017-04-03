import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { Session }  from '../config/session';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public session = new Session

  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
   this.session.currentUser().then((val) => {
         
      if(val){
        this.rootPage = HomePage;
        
        console.log("true")
      }else{
        this.rootPage = LoginPage;
        console.log("false")

      }
    })
  }
  
    
}
