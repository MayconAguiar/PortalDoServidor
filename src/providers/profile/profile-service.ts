import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database'
import { FirebaseApp } from 'angularfire2';
import  * as firebase from 'firebase/app';
import { Profile } from './profile';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileService {

  constructor(public http: HttpClient,
    private angularFireDatabase: AngularFireDatabase,
    private fb: FirebaseApp) {
  }

  obtenha(userId): AngularFireObject<Profile> {
    return this.angularFireDatabase.object<Profile>(`profiles/${userId}`);
  }

  salve(userId, profile: Profile) {
      this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
  }

  uploadAndSave(userId, profile: Profile, fileToUpload: any){
    let storageRef = this.fb.storage().ref();
    let basePath = '/profiles' + userId;
    profile.fullPath = basePath + "/" + profile.apelido + '.png';

    // imagem base 64;
    let imagem;
    let uploadTask = storageRef.child(profile.fullPath).putString(imagem, 'base64');

    uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot: any) => {
      var progress = (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
      console.log(progress + "% done");
    },
    (error) => console.log(error),
    () => {
      profile.url = uploadTask.snapshot.downloadURL;
      this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
    });
  }

  removeFile(fullPath: string) {
    let storageRef = this.fb.storage().ref();
    storageRef.child(fullPath).delete();
  }
}
