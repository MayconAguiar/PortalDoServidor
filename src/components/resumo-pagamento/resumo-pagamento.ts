import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Resumo } from '../../providers/pagamento/resumo';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'resumo-pagamento',
  templateUrl: 'resumo-pagamento.html'
})
export class ResumoPagamentoComponent implements AfterViewInit, OnDestroy {

  @Input("userId") userId: Observable<any>;
  subscription;
  resumos: Observable<Resumo[]>;
  subjectresumo = new BehaviorSubject<Resumo[]>([]);

  constructor(private pagamentoService: PagamentoService, private ref: ChangeDetectorRef) {
    this.resumos = this.subjectresumo.asObservable();
  }

  ngAfterViewInit() {
    this.subscription = this.userId.subscribe(id => {
       this.pagamentoService.obtenhaResumo(id)
       .subscribe(x => {
          const lista = [];
          lista.push(x);
          this.subjectresumo.next(lista);
          this.ref.detectChanges();
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
