import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../providers/profile/profile';
import { ProfileService } from '../../providers/profile/profile-service';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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
    public platform: Platform,
    private profileService: ProfileService,
    private camera: Camera,
    public actionsheetCtrl: ActionSheetController,
    private ref: ChangeDetectorRef) {
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

  alterarFoto() {
    let actionSheet = this.actionsheetCtrl.create({
          title: 'Opções',
          cssClass: 'action-sheets-basic-page',
          buttons: [
            {
              text: 'Tirar uma foto',
              role: 'destructive',
              icon: !this.platform.is('ios') ? 'ios-camera-outline' : null,
              handler: () => {
                this.takephoto();
              }
            },
            {
              text: 'Escolher foto na galeria',
              icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
              handler: () => {
                this.openGallery();
              }
            },
      ]
    });
    actionSheet.present();
  }

  takephoto() {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          }

          this.camera.getPicture(options).then((imageData) => {
            this.imgPath = 'data:image/jpeg;base64,' + imageData;
            this.fileToUpload = imageData;
            this.fezUpload = true;
          }, (err) => {
            // Handle error
          })}

openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    this.camera.getPicture(options).then((imageData) => {
    this.imgPath = 'data:image/jpeg;base64,' + imageData;
    this.fileToUpload = imageData;
    this.fezUpload = true;
    }, (err) => {
      // Handle error
    });
  }
}
