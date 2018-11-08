import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database'
import  * as firebase from 'firebase/app';
import { Profile } from './profile';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileService {

  constructor(public http: HttpClient, private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello ProfileProvider Provider');
  }

  obtenha(userId): AngularFireObject<Profile> {
    return this.angularFireDatabase.object<Profile>(`profiles/${userId}`);
  }

  salve(userId, profile: Profile) {
    this.angularFireDatabase.object(`profiles/${userId}`).set(profile);
  }
}
