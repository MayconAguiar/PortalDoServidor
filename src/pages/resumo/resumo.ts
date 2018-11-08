import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Resumo } from '../../providers/pagamento/resumo';
import { Observable } from 'rxjs';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';

@IonicPage()
@Component({
  selector: 'page-resumo',
  templateUrl: 'resumo.html',
})
export class ResumoPage {

  @Input("userId") userId: Observable<any>;
  carregado= false;
  resumo: Resumo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pagamentoService: PagamentoService) {
     const observableId = this.userId.subscribe(id => {
        if(id !== null) {
          const observable = this.pagamentoService.obtenhaResumo(this.userId).subscribe(x => {
            this.resumo = x || new Resumo();
            this.carregado = true;
            observable.unsubscribe();
          });
          observableId.unsubscribe();
        }
      })

  }

  emitirPdf() {

  }
}
