import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-resumo-pagamento',
  templateUrl: 'item-resumo-pagamento.html'
})
export class ItemResumoPagamentoComponent {

  @Input("resumo") resumo;

  constructor() {
  
  }

}
