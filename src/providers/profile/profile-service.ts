import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database'
import { FirebaseApp } from 'angularfire2';
import  * as firebase from 'firebase/app';
import { Profile } from './profile';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileService {

  constructor(public http: HttpClient,
    private angularFireDatabase: AngularFireDatabase,
    private afStorage: AngularFireStorage) {
  }

  obtenha(userId): AngularFireObject<Profile> {
    return this.angularFireDatabase.object<Profile>(`profiles/${userId}`);
  }

  salve(userId, profile: Profile) {
      this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
  }

  uploadAndSave(userId, profile: Profile, fileToUpload: any){
    let storageRef = this.afStorage;
    let basePath = '/profiles' + userId;
    profile.fullPath = basePath + "/" + profile.apelido + '.png';


    let uploadTask = storageRef.ref(profile.fullPath).putString(fileToUpload, 'base64');

    uploadTask.then(uploadTask=> {
      uploadTask.ref.getDownloadURL().then(url => {
             profile.url = url;
             this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
           });
    });
  }

  removeFile(fullPath: string) {
    let storageRef = this.afStorage;
    storageRef.ref(fullPath).delete();
  }
}
