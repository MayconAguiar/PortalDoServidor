import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import { Resumo } from '../../providers/pagamento/resumo';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'resumo-pagamento',
  templateUrl: 'resumo-pagamento.html'
})
export class ResumoPagamentoComponent implements AfterViewInit {

  @Input("userId") userId: Observable<any>;
  // carregado: Observable<boolean>;
  //subjectCarregado = new BehaviorSubject<boolean>(false);
  // resumo: Resumo = new Resumo();
  resumos: Observable<Resumo[]>;
  subjectresumo = new BehaviorSubject<Resumo[]>([]);

  constructor(private pagamentoService: PagamentoService, private ref: ChangeDetectorRef) { 
    this.resumos = this.subjectresumo.asObservable();
  }

  ngAfterViewInit() {
    const userIdObservable = this.userId.subscribe(id => {
      console.log(id);
      this.pagamentoService.obtenhaResumo(id)
       .subscribe(x => {
          //this.resumo = x || new Resumo();
          // console.log(resultado);
          const lista = [];
          lista.push(x);
          this.subjectresumo.next(lista);
          this.ref.detectChanges();
          //this.resumo = x;
      });
    })
    
  }

}
