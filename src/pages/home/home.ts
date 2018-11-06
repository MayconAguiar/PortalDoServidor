import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  // user = new User();
  
  constructor(public navCtrl: NavController, private authService: AuthService) {
    
  }

  sair() {
    this.navCtrl.setRoot(SigninPage);
    this.authService.sair();
  }

}
