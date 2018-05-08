import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';


declare var process: {
  env: {
    API_URL: string,
    GGL_API_KEY: string,
    FB_APP_ID: string,
    GGL_CLIENT_ID: string
  }
}

// console.log(process['env']);
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    console.log(JSON.stringify(process.env.API_URL, undefined, 2));
    console.log(JSON.stringify(process.env.GGL_API_KEY, undefined, 2));
    console.log(JSON.stringify(process.env.GGL_CLIENT_ID, undefined, 2));
    console.log(JSON.stringify(process.env.FB_APP_ID, undefined, 2));
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


    });    
  }


}
