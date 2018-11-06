import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  user = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  novoUsuario() {
    this.navCtrl.setRoot(SignupPage);
  }
}
