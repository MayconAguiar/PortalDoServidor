import { BrowserModule } from '@angular/platform-browser';
import localeBR from '@angular/common/locales/pt';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ImagePicker } from '@ionic-native/image-picker';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service/auth-service';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ProfileService } from '../providers/profile/profile-service';
import { ProfilePage } from '../pages/profile/profile';
import { HttpClientModule } from '@angular/common/http';
import { PagamentoService } from '../providers/pagamento/pagamento-service';
import { PipesModule } from '../pipes/pipes.module';
import { ResumoPagamentoComponent } from '../components/resumo-pagamento/resumo-pagamento';
import { InicialPage } from '../pages/inicial/inicial';

const firebaseConfig = {
    apiKey: "AIzaSyA84s0aMZaoElicMyVLYHpSqBy6jjLtELM",
    authDomain: "portaldoservidor-fc6d8.firebaseapp.com",
    databaseURL: "https://portaldoservidor-fc6d8.firebaseio.com",
    projectId: "portaldoservidor-fc6d8",
    storageBucket: "portaldoservidor-fc6d8.appspot.com",
    messagingSenderId: "1033942276380"
}

registerLocaleData(localeBR);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    ProfilePage,
    InicialPage,
    ResumoPagamentoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetpasswordPage,
    ProfilePage,
    InicialPage
  ],
  providers: [
    AngularFireAuth,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ProfileService,
    PagamentoService,
    ImagePicker,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class AppModule {}
