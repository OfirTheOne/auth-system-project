import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AuthPageModule } from './../pages/auth/auth.module';
import { ProfileFormPageModule } from '../pages/profile-form/profile-form.module';
import { ProfilePageModule } from './../pages/profile/profile.module';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { AuthPage } from '../pages/auth/auth';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfileFormPage } from '../pages/profile-form/profile-form';


import { UserApiService } from '../services/user-api/user-api.service';
import { GoogleAuthStrategyService } from '../services/google-auth/google-auth.service';
import { FacebookAuthStrategyService } from '../services/facebook-auth/facebook-auth.service';
import { CustomAuthStrategyService } from '../services/custom-auth/custom-auth.service';
import { AgentAuthService } from '../services/agent-auth.service';
import { EnvironmentService } from '../services/environment/environment.service';


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
    ProfileFormPageModule,
    ProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    ProfileFormPage,
    ProfilePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EnvironmentService,
    UserApiService,
    GoogleAuthStrategyService,
    FacebookAuthStrategyService,
    CustomAuthStrategyService,
    AgentAuthService
  ]
})
export class AppModule {}
