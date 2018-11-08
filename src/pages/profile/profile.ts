import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../providers/profile/profile';
import { ProfileService } from '../../providers/profile/profile-service';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  perfil = new Profile();
  userId;
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileService: ProfileService) {
      this.userId = this.navParams.get("userId");
      this.profileService.obtenha(this.userId).valueChanges().subscribe(x => {
        this.perfil = x == undefined ? new Profile() : x;
      });
  }

  salve() {
    if(this.form.form.valid){
      this.profileService.salve(this.userId, this.perfil);
    }
  }
}
