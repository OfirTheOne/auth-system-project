import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthPageModule } from './../pages/auth/auth.module';
import { ProfilePageModule } from './../pages/profile/profile.module';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/auth';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';


import { UserApiService } from './../services/user-api/user-api.service';
import { GoogleAuthService } from '../services/google-auth/google-auth.service';
import { FacebookAuthService } from '../services/facebook-auth/facebook-auth.service';
import { CustomAuthService } from '../services/custom-auth/custom-auth.service';
import { AgentAuthService } from '../services/agent-auth.service';





@NgModule({
  declarations: [
    MyApp,
    //AuthPage,
    //ProfilePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AuthPageModule,
    ProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    ProfilePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleAuthService,
    FacebookAuthService,
    UserApiService,
    CustomAuthService,
    AgentAuthService
  ]
})
export class AppModule {}
