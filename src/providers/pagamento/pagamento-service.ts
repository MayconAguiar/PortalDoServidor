import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resumo } from './resumo';
import { Observable } from 'rxjs';
import { Profile } from '../profile/profile';

@Injectable()
export class PagamentoService {

  constructor(public http: HttpClient) {
  }

  obtenhaResumo(perfil: Profile) {    
    return this.http.get(`http://localhost:84/api/contracheque/ObtenhaResumos?cpf=${perfil.cpf}&empresa=${perfil.contratopadrao.empresa}&matricula=${perfil.contratopadrao.matricula}`)
    .map(result => this.obtenhaItens(result));
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
