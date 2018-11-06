import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs';
import  * as firebase from 'firebase/app';
import { User } from './user';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
  }

  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  signin(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.senha);
  }

  resetPassword(email) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  sair(){
    this.angularFireAuth.auth.signOut();
  }
}
