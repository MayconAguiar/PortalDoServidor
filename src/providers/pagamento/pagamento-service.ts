import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resumo } from './resumo';
import { Observable } from 'rxjs';

@Injectable()
export class PagamentoService {

  constructor(public http: HttpClient) {
  }

  obtenhaResumo(userId) {

    return this.http.get("http://localhost:84/api/contracheque/ObtenhaResumos?cpf=70425027104&empresa=1&matricula=5572909")
    .map(result => this.obtenhaItens(result));
    
    // return new Observable<Resumo[]>(observer =>{
    //   const resumos = [];

    //   for (let index = 10; index >0; index--) {
    //     resumos.push(this.obtenhaItem(index));
    //   }

    //   observer.next(resumos);
    //   observer.complete();
    // });

  }

  obtenhaItens(itens) {

    const result = JSON.parse(itens);
    const resumos = [];

    result.forEach(element => {
      const resumo = new Resumo();
      resumo.mes = element.Referencia;
      
      element.Valores.forEach(valor => {
        switch (valor.Codigo) {
          case '9997':
            resumo.salarioBruto = valor.Valor;      
            break;
          case '9998':
            resumo.descontos = valor.Valor;      
            break;
          case '9999':
            resumo.salarioLiquido = valor.Valor;      
            break;
          default:
            break;
        }
      });
      
      resumos.push(resumo);

      
    });

    return resumos;
  }

  obtenhaItem(index) {
      const resumo = new Resumo();
      resumo.salarioBruto = 4500;
      resumo.descontos = 200;
      resumo.salarioLiquido = resumo.salarioBruto - resumo.descontos;
      resumo.mes = new Date();
      resumo.mes.setMonth(resumo.mes.getMonth() - index);
      return resumo;
  }
}
