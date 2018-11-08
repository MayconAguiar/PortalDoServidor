import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { ProfileService } from '../../providers/profile/profile-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profile } from '../../providers/profile/profile';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Resumo } from '../../providers/pagamento/resumo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userId;
  perfil: Profile;
  perfilCarregado: Observable<boolean>;
  subjectPerfil = new BehaviorSubject<boolean>(false);
  resumo: Resumo;
  resumoCarregado: Observable<boolean>;
  subjectResumo = new BehaviorSubject<boolean>(false);

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private profileService: ProfileService,
    private pagamentoService: PagamentoService)
    {
      this.perfilCarregado = this.subjectPerfil.asObservable();
      this.resumoCarregado = this.subjectResumo.asObservable();
      this.angularFireAuth.authState.subscribe(user => {
        if(user) {
          this.userId = user.uid;

          this.profileService.obtenha(this.userId)
          .valueChanges()
          .subscribe(x => {
            this.perfil = x || new Profile();
            console.log(this.perfil);
            this.subjectPerfil.next(true);
            // perfilObservable.unsubscribe();
          });

          const observableResumo = this.pagamentoService.obtenhaResumo(this.userId)
          .subscribe(resumo =>{
            this.resumo = resumo;
            this.subjectResumo.next(true);
            //observableResumo.unsubscribe();
          });

        }
        // observableUser.unsubscribe();
      });
  }

  sair() {
    this.navCtrl.setRoot(SigninPage);
    this.authService.sair();
  }

  profile() {
    this.navCtrl.push(ProfilePage, { userId: this.userId });
  }

  pagamentos() {
  }

  emitirPdf() {

  }
}
