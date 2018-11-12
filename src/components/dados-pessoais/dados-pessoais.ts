import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';
/**
 * Generated class for the DadosPessoaisComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dados-pessoais',
  templateUrl: 'dados-pessoais.html'
})
export class DadosPessoaisComponent {

  @Input("perfil") perfil: Observable<any>;
  item;
  constructor(private ref: ChangeDetectorRef) {      
  }
}
