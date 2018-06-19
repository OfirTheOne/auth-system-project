import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile-form',
  templateUrl: 'profile-form.html',
})
export class ProfileFormPage {

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileFormPage');
  }

  async submitData(form: NgForm) {
    let bd = (form.value["birthDate"]).split('-');
    const data = {
      firstName : form.value["firstName"],
      lastName: form.value["lastName"],
      birthDate: {
        day: bd[0],
        month: bd[1],
        year: bd[2]
      },
      gender: form.value["gender"]
    };
    
    this.onExit(data);

  }

  onExit(data) {
    this.viewCtrl.dismiss(data);
  }

}
