import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'contrato-selecionado',
  templateUrl: 'contrato-selecionado.html'
})
export class ContratoSelecionadoComponent {

  @Input("perfil") perfil;
  constructor() {
  }
}
