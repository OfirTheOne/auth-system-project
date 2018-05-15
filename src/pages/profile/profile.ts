import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgentAuthService } from '../../services/agent-auth.service';
import { UserDataBase } from '../../models/user-data-base.interface';
import { Provider } from '../../models/provider.enum';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private agentAuth: AgentAuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  isSignIn() {
    return this.agentAuth.isSignIn();
  }

  getProfile(): UserDataBase {
    if(this.agentAuth.isSignIn()) {
      return this.agentAuth.getProfile();
    }
  }

  getProvider(): number {
    const prov = this.agentAuth.getProvider();
    if(prov) {
      return prov;
    } else {
      return -1;
    }
  }
}
