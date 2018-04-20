import { AgentAuthService } from './../../services/agent-auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Provider } from '../../models/provider.enum';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private agentAuthService: AgentAuthService) {
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
      await this.agentAuthService.onSignIn();
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
      await this.agentAuthService.onSignIn(params);
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
