import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Resumo } from '../../providers/pagamento/resumo';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'resumo-pagamento',
  templateUrl: 'resumo-pagamento.html'
})
export class ResumoPagamentoComponent implements AfterViewInit, OnDestroy {

  @Input("userId") userId: Observable<any>;
  subscription;
  resumosObservable: Observable<Resumo[]>;
  resumos: Resumo[];
  
  subjectresumo = new BehaviorSubject<Resumo[]>([]);
  subjectAtual = new BehaviorSubject<number>(0);

  @ViewChild(Slides) slides: Slides;

  anterior = -1;
  atual = 0;
  proximo = -1;  

  resumoAtual;
  resumoProximo;
  resumoAnterior;

  constructor(private pagamentoService: PagamentoService, private ref: ChangeDetectorRef) {
    this.resumosObservable = this.subjectresumo.asObservable();
    this.subjectAtual.subscribe(x => this.setMesAtual(x));
  }

  ngAfterViewInit() {

    this.subscription = this.userId.subscribe(id => {
       this.pagamentoService.obtenhaResumo(id)
       .subscribe(x => {            
          this.resumos = x;          
          this.subjectAtual.next(x.length - 1);
          this.subjectresumo.next(x);                              
          this.ref.detectChanges();

      });
    });
  }

  mesAnterior() {
    this.subjectAtual.next(this.atual -1);
    this.slides.slideTo(this.atual);    
  }

  mesProximo() {
    this.subjectAtual.next(this.atual + 1);
    this.slides.slideTo(this.atual);
  }

  setMesAtual(mesAtual) {            
    if (mesAtual >= 0 && this.resumos != null && mesAtual < this.resumos.length) {
      this.atual = mesAtual;
      this.anterior = mesAtual - 1;
      this.proximo = mesAtual + 1;
      this.resumoAtual = this.obtenhaResumo(this.atual);
      this.resumoAnterior = this.obtenhaResumo(this.anterior);
      this.resumoProximo = this.obtenhaResumo(this.proximo);      
    }
  }

  obtenhaResumo(index){
    if (index != -1 && this.resumos !=null && this.resumos.length > index){
      return this.resumos[index];
    }
  }

  slideChanged() {    
    let currentIndex = this.slides.getActiveIndex();
    this.subjectAtual.next(currentIndex);    
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.slides.update();
    this.slides.slideTo(this.atual);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
