import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
// import { ProfileService } from '../../providers/profile/profile-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userId;
  //perfil: Observable<Profile>

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth)
    // ,
    // private profileService: ProfileService)
    {
      this.angularFireAuth.authState.subscribe(user => {
        if(user) {
          this.userId = user.uid;
          //this.perfil = this.profileService.obtenha(this.userId).valueChanges();
        }
      });
  }

  sair() {
    this.navCtrl.setRoot(SigninPage);
    this.authService.sair();
  }

  profile() {
    this.navCtrl.push(ProfilePage, { userId: this.userId });
  }

}
