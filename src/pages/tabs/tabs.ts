import { Component } from '@angular/core';

import { AuthPage } from '../auth/auth';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AuthPage;
  tab2Root = ProfilePage;

  constructor() {

  }
}
