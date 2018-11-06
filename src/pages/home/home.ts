import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  // user = new User();
  
  constructor(public navCtrl: NavController) {
    this.navCtrl.setRoot(SigninPage);
  }

}
