
import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { AgentAuthService } from '../../services/agent-auth.service';
import { EnvironmentService } from '../../services/environment/environment.service';

import { Provider } from '../../models/provider.enum';

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
        this.agentAuthService.authResourcesInitEventSubscribe(() => {
          loader.dismiss();
        });
      }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AuthPage');
  }
  

  async gglSignIn() {
    try {
     const res =  await this.agentAuthService.onSignIn(Provider.GOOGLE_PROVIDER);
     console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  }

  async fbSignIn() {
    try {
      if(this.environment.isDev()) {
        const fakeBody = {token: "EAABuxssE9ZA4BANIprwvgTZCZB9YmPZCmdVh4sEGqhZBS1ikBckTpcZAwe4qk2oJvqIDWaTTgHnDxW5AI1mxYJZAvp2osouE1fz5ZCTUhc9NdLBbULr31wx6xffZALzGNEsQJAABiaSOlEAFhnpZAWfrYEzNUX9OJn3ZBffXaXbbTE5GWe3Vh6Ju7WdiCTOA1xblLiLIjgaqRjktgZDZD"};
        const res = await this.agentAuthService.onSignIn(Provider.FACEBOOK_PROVIDER, fakeBody);
        console.log(res);
      } else {
        const res = await this.agentAuthService.onSignIn(Provider.FACEBOOK_PROVIDER);
        console.log(res);
      }
  
    
    } catch (ex) {
      console.log(ex);
    }
  }

  async ctSignIn() {
    try {

      await this.agentAuthService.onSignIn(Provider.CUSTOM_PROVIDER);
    } catch (ex) {
      console.log(ex);
    }
  }

  async ctSignUp() {
    try {
      // this.agentAuthService.setStrategy(Provider.CUSTOM_PROVIDER);
      const params = {};
      const res = await this.agentAuthService.onSignIn(Provider.CUSTOM_PROVIDER, params);
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
