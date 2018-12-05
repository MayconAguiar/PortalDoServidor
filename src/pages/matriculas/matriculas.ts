import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-matriculas',
  templateUrl: 'matriculas.html',
})
export class MatriculasPage {

  itens;
  perfil;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private servico: PagamentoService,
    private storage: Storage,
    private toastCtrl: ToastController) {

      this.storage.get('perfil').then(perfilStr => {
          this.perfil = JSON.parse(perfilStr);
          if (!this.isNullOrEmpty(this.perfil.cpf)) {
            this.itens = this.servico.obtenhaContratos(this.perfil);
          }
      });

      this.events.subscribe('perfilAlterado', (perfil) => this.perfil = perfil);
  }

  selecionar(matricula) {
    this.events.publish('mudouMatricula', matricula);
  }

  definirComoPadrao() {
    const toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    this.servico.AtualizeContratoPadrao(this.perfil);
    toast.setMessage('Matrícula padrão atualizada.');
    toast.present();
  }

  private isNullOrEmpty(obj) {
    if (typeof obj === 'string' || obj instanceof String) {
        return obj === '' || obj == null;
    }
    return true;
  }
}
