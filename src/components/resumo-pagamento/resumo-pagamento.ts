import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

import { Resumo } from '../../providers/pagamento/resumo';
import { PagamentoService } from '../../providers/pagamento/pagamento-service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'resumo-pagamento',
  templateUrl: 'resumo-pagamento.html'
})
export class ResumoPagamentoComponent implements AfterViewInit {

  @Input("userId") userId: Observable<any>;
  subscription;  
  resumos: Resumo[];
    
  subjectAtual = new BehaviorSubject<number>(-1);
  atualObservable : Observable<number>;

  @ViewChild(Slides) slides: Slides;

  anterior = -1;
  atual = 0;
  proximo = -1;  

  resumoAtual;
  resumoProximo;
  resumoAnterior;
  itens =[];
  inicial=0;  

  constructor(private pagamentoService: PagamentoService, private ref: ChangeDetectorRef, private storage: Storage) {    
    this.atualObservable = this.subjectAtual.asObservable();
    this.subjectAtual.subscribe(x => this.setMesAtual(x));    
  }

  ngAfterViewInit() {

    this.subscription = this.userId.subscribe(id => {
      if (id) {         
        this.storage.get("perfil").then(perfilStr => {
            const perfil = JSON.parse(perfilStr);
            
            this.pagamentoService.obtenhaResumo(perfil)
            .subscribe(x => {
                this.inicial = x.length -1;
                this.itens = x;          
                this.resumos = x;          
                this.setMesAtual(x.length -1);
                this.ref.detectChanges();
                
                this.subscription.unsubscribe();
            }); 
        });
  
         
      }
    });
  }

  mesAnterior() {
    this.subjectAtual.next(this.atual -1);
  }

  mesProximo() {
    this.subjectAtual.next(this.atual + 1);    
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

  mudou(currentIndex) {
    // console.log('mudou');
    // console.log(currentIndex);
    this.subjectAtual.next(currentIndex);

  }
}
