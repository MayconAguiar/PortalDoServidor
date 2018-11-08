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
  dadosIniciais: Observable<boolean>;  
  subjectDadosIniciais = new BehaviorSubject<boolean>(false);
  subjectId = new BehaviorSubject<any>({});
  userIdObservable = this.subjectId.asObservable();


  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private profileService: ProfileService,
    private pagamentoService: PagamentoService)
    {
      this.dadosIniciais = this.subjectDadosIniciais.asObservable();

      this.angularFireAuth.authState.subscribe(user => {
        if(user) {            
            this.userId = user.uid;
            this.profileService.obtenha(this.userId)
            .valueChanges()
            .subscribe(perfil => {
                this.perfil = perfil || new Profile();
                this.subjectDadosIniciais.next(true);
                this.subjectId.next(this.userId);

              });
          }        
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
}
