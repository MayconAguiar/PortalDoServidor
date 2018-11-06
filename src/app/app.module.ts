import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service/auth-service';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';

const firebaseConfig = {
    apiKey: "AIzaSyA84s0aMZaoElicMyVLYHpSqBy6jjLtELM",
    authDomain: "portaldoservidor-fc6d8.firebaseapp.com",
    databaseURL: "https://portaldoservidor-fc6d8.firebaseio.com",
    projectId: "portaldoservidor-fc6d8",
    storageBucket: "portaldoservidor-fc6d8.appspot.com",
    messagingSenderId: "1033942276380"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage
  ],
  providers: [
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
