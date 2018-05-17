
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Provider } from '../../models/provider.enum';
import { AgentAuthService } from '../../services/agent-auth.service';
import { EnvironmentService } from '../../services/environment/environment.service';


@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController, 
    private agentAuthService: AgentAuthService,
    private environment: EnvironmentService) {
      if (!this.agentAuthService.getIsAuthResInit()) {
        const loader = this.presentLoading('loading');
        this.agentAuthService.authResInitEventSubscribe(() => {
          loader.dismiss();
        });
      }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AuthPage');
  }

  async gglSignIn() {
    try {

      this.agentAuthService.setStrategy(Provider.GOOGLE_PROVIDER);
     const res =  await this.agentAuthService.onSignIn();
     console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }

  async fbSignIn() {
    try {
      this.agentAuthService.setStrategy(Provider.FACEBOOK_PROVIDER);
      if(this.environment.isDev()) {
        const fakeBody = {token: "EAABuxssE9ZA4BAPgiHMh1ZBjGy68gSgITzarwEJ2cqLJZBKlU…VhpFCnBVzh04O1hGoh0yZCKYDBrRheWe6bgdXzhJYTmkgZDZD", userID: "251074535454201", expiresIn: 4316, signedRequest: "0DvQRC_Ty3evO4H_zvdN5SrZtwOpgMFL2LfeFrrItqk.eyJhbG…yNjU1NDA4NCwidXNlcl9pZCI6IjI1MTA3NDUzNTQ1NDIwMSJ9"};
        const res =  this.agentAuthService.onSignIn(fakeBody);
        console.log(res);
      } else {
        const res =  this.agentAuthService.onSignIn();
        console.log(res);
      }
  
    
  } catch (ex) {
    console.log(ex);
  }
  }

  async ctSignIn() {
    try {
      this.agentAuthService.setStrategy(Provider.CUSTOM_PROVIDER);
      await this.agentAuthService.onSignIn();
    } catch (ex) {
      console.log(ex);
    }
  }

  async ctSignUp() {
    try {
      this.agentAuthService.setStrategy(Provider.CUSTOM_PROVIDER);
      const params = {};
      const res = await this.agentAuthService.onSignIn(params);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }

  presentLoading(text): Loading {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `<div><h3>${text}</h3></div>`,
    });

    loading.present();
    return loading;
  }

  isUserSignIn() {
    return this.agentAuthService.isSignIn();
  }

  async signOut() {
    try{
      const res = await this.agentAuthService.onSignOut();
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  }
}
