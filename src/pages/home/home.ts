import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { ProfileService } from '../../providers/profile/profile-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from '../../providers/profile/profile';
import { InicialPage } from '../inicial/inicial';

import { Storage } from '@ionic/storage';
import { MatriculasPage } from '../matriculas/matriculas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userId;
  perfil: Profile;
  dadosIniciais: Observable<boolean>;
  subjectDadosIniciais = new BehaviorSubject<boolean>(false);
  subjectId = new BehaviorSubject<any>({});
  userIdObservable = this.subjectId.asObservable();
  subjectPerfil = new BehaviorSubject<any>({});
  perfilObservable = this.subjectId.asObservable();


  constructor(
    public navCtrl: NavController,
    public events: Events,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private profileService: ProfileService,
    private storage: Storage)
    {
      this.dadosIniciais = this.subjectDadosIniciais.asObservable();
      this.perfilObservable = this.subjectPerfil.asObservable();

      this.angularFireAuth.authState.subscribe(user => {
        if(user) {
            this.userId = user.uid;            
            this.profileService.obtenha(this.userId)
            .valueChanges()
            .subscribe(perfil => {
                this.perfil = perfil || new Profile();
                this.storage.set("perfil",  JSON.stringify(perfil));                
                this.subjectDadosIniciais.next(true);
                this.subjectId.next(this.userId);
                this.subjectPerfil.next(perfil);
              });
          }
      });

      this.events.subscribe("mudouMatricula", (matricula) => this.mudouMatricula(matricula));
  }

  sair() {
    this.storage.remove("perfil");
    this.navCtrl.setRoot(InicialPage);
    this.authService.sair();
  }

  profile() {
    this.navCtrl.push(ProfilePage, { userId: this.userId });
  }

  mudarMatricula() {
    console.log("clicou em mudar matricula");
    this.navCtrl.push(MatriculasPage);
  }

  mudouMatricula(matricula) {
    // console.log('mudou matricula');
    this.perfil.contratopadrao.matricula = matricula;
    this.storage.set("perfil",  JSON.stringify(this.perfil));
    this.subjectPerfil.next(this.perfil);
    this.events.publish("perfilAlterado", this.perfil);
  }

  pagamentos() {
  }
}
