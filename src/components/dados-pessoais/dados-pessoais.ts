import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dados-pessoais',
  templateUrl: 'dados-pessoais.html'
})
export class DadosPessoaisComponent {

  @Input('perfil') perfil: Observable<any>;
  item;

  constructor() {
  }
}
