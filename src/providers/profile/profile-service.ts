import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from './profile';
import { AngularFireStorage } from 'angularfire2/storage';

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

  uploadAndSave(userId, profile: Profile, fileToUpload: any) {
    const storageRef = this.afStorage;
    const basePath = '/profiles' + userId;
    profile.fullPath = basePath + '/' + profile.apelido + '.png';


    const uploadTask = storageRef.ref(profile.fullPath).putString(fileToUpload, 'base64');

    uploadTask.then(uploadtask => {
      uploadtask.ref.getDownloadURL().then(url => {
             profile.url = url;
             this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
           });
    });
  }

  removeFile(fullPath: string) {
    const storageRef = this.afStorage;
    storageRef.ref(fullPath).delete();
  }
}
