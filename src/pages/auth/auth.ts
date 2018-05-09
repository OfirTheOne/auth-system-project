import { AgentAuthService } from './../../services/agent-auth.service';
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Provider } from '../../models/provider.enum';
import { EnvVariables } from '../../environments/environment.token';


@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(@Inject(EnvVariables) public envVariables,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController, 
    private agentAuthService: AgentAuthService) {
      if (!this.agentAuthService.getIsAuthResInit()) {
        const loader = this.presentLoading('loading');
        this.agentAuthService.authResInitEventSubscribe(() => {
          loader.dismiss();
        });
      }
  }

  ionViewDidLoad() {
    console.log(this.envVariables.API_URL);
    console.log(this.envVariables.API_URL);

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
    /*this.agentAuthService.setStrategy(Provider.FACEBOOK_PROVIDER);
    this.agentAuthService.onSignIn();*/
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
