import { Component, Input } from '@angular/core';

@Component({
  selector: 'contrato-selecionado',
  templateUrl: 'contrato-selecionado.html'
})
export class ContratoSelecionadoComponent {

  @Input('perfil') perfil;
  constructor() {
  }
}
