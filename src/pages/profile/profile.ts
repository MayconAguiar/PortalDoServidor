import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../providers/profile/profile';
import { ProfileService } from '../../providers/profile/profile-service';
import { NgForm } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  perfil = new Profile();
  userId;
  imgPath: string = '';
  fileToUpload: any;
  fezUpload = false;
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profileService: ProfileService,
    private imagePicker: ImagePicker) {
      this.userId = this.navParams.get("userId");
      const observableProfile = this.profileService.obtenha(this.userId).valueChanges().subscribe(x => {
        this.perfil = x || new Profile();

        observableProfile.unsubscribe();
      });
  }

  salvar() {
    if(this.form.form.valid){
      if (this.fezUpload) {
        this.profileService.uploadAndSave(this.userId, this.perfil, this.fileToUpload);
      } else  {
        this.profileService.salve(this.userId, this.perfil);
      }
      this.navCtrl.pop();
    }
  }

  // uploadAndSave(){
    
  // }

  escolherFoto() {    
     this.imagePicker.hasReadPermission()
     .then(hasPermission => {
       if (hasPermission){
         this.pegarImagem();
       } else {
         this.solicitarPermissao();
       }
     }).catch(error => {
       console.error('Erro ao verificar a permissão', error);
    });
  }

  solicitarPermissao() {
    this.imagePicker.requestReadPermission()
    .then(hasPermission => {
      if (hasPermission){
        this.pegarImagem();
      } else {
        console.error('Permissão negada');
      }
    }).catch(error => {
      console.error('Erro ao verificar a permissão', error);
    })
  }

  pegarImagem() {
    debugger;
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      outputType: 1 //base 64
    })
    .then(results => {
      if (results.length > 0){
        this.imgPath = 'data:image/png;base64,' + results[0];
        this.fileToUpload = results[0];
        this.fezUpload = true;
      } else {
        this.imgPath = '';
        this.fileToUpload = null;
      }
    }).catch(error => {
      console.error('Erro ao recuperar a imagem', error);
    })
  }

}
