import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AgentAuthService } from '../../services/agent-auth.service';
import { ProfileFormPage } from '../profile-form/profile-form';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private modalCtrl: ModalController,
    private agentAuth: AgentAuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  isSignIn() {
    return this.agentAuth.isSignIn();
  }

  getProfile() {
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

  presentProfileModal() {
    let profileFormModal = this.modalCtrl.create(ProfileFormPage);
    profileFormModal.present();
    profileFormModal.onDidDismiss(async (data) => {
      console.log(data);
      await this.agentAuth.onUpdateUserData(data);
    });
  }
}
