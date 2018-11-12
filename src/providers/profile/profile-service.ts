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

    // var subscribe = uploadTask.snapshotChanges()
    // .subscribe((item)=> {
      
    // },
    // error => {},
    // (x) => {
    //   x.ref.getDownloadURL().then(url => {
    //     profile.url = url;
    //     this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
    //   });      
    // });
    // .then(x => {      
      
    // })

    uploadTask.then(uploadTask=> {
      uploadTask.ref.getDownloadURL().then(url => {
             profile.url = url;
             this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
           });      
    });
    
    // .on(
    // firebase.storage.TaskEvent.STATE_CHANGED,
    // (snapshot: any) => {
    //   var progress = (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
    //   console.log(progress + "% done");
    // },
    // (error) => console.log(error),
    // () => {
    //   profile.url = uploadTask.snapshot.downloadURL;
    //   this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
    // });
  }

  removeFile(fullPath: string) {
    let storageRef = this.afStorage;
    storageRef.ref(fullPath).delete();
    // storageRef.child(fullPath).delete();
  }
}
