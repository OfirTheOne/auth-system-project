import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileFormPage } from './profile-form';

@NgModule({
  declarations: [
    ProfileFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileFormPage),
  ],
})
export class ProfileFormPageModule {}
