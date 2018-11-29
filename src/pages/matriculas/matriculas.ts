import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';

import { Storage } from '@ionic/storage';
import { Profile } from '../../providers/profile/profile';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-matriculas',
  templateUrl: 'matriculas.html',
})
export class MatriculasPage {

  itens;
  perfil: Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servico: PagamentoService,  private storage: Storage) {
     this.storage.get("perfil").then(perfilStr => {
       this.perfil = JSON.parse(perfilStr);
       console.log(this.perfil);
       this.itens = this.servico.obtenhaContratos(this.perfil);      
    });
  }
}
