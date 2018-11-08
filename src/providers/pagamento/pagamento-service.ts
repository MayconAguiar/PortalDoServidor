import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resumo } from './resumo';
import { Observable } from 'rxjs';

@Injectable()
export class PagamentoService {

  constructor(public http: HttpClient) {
  }

  obtenhaResumo(userId) {
    return new Observable<Resumo>(observer =>{
      const resumo = new Resumo();
      resumo.salarioBruto = 4500;
      resumo.descontos = 200;
      resumo.salarioLiquido = resumo.salarioBruto - resumo.descontos;
      resumo.mes = new Date();
      observer.next(resumo);
      observer.complete();
    });

  }

}
