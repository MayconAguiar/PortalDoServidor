import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resumo } from './resumo';
import { Profile, Contrato } from '../profile/profile';
import { ProfileService } from '../profile/profile-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FileTransfer } from '@ionic-native/file-transfer';

@Injectable()
export class PagamentoService {

  constructor(
    public http: HttpClient,
    private profileService: ProfileService,
    private angularFireAuth: AngularFireAuth, private transfer: FileTransfer) {
  }

  obtenhaResumo(perfil: Profile) {
    if (!perfil.contratopadrao) {
      // irá atualizar o contrato padrao pra depois retornar os resumos
      return this.atualizeContratoPadraoComOPrimeiroDaLista(perfil).flatMap(() => this.obtenhaResumoInterno(perfil));
    } else {
      return this.obtenhaResumoInterno(perfil);
    }
  }

  atualizeContratoPadraoComOPrimeiroDaLista(perfil: Profile) {
    return this.obtenhaContratos(perfil)
     .map(contratos => {
          if (contratos) {
           perfil.contratopadrao = new Contrato();
           perfil.contratopadrao.empresa = contratos[0].empresa;
           perfil.contratopadrao.matricula = contratos[0].matricula;

           return perfil;
          }
      })
     .flatMap(p => this.teste(p));
  }


  teste (perfil) {
    return this.angularFireAuth.authState.map(user => this.profileService.salve(user.uid, perfil));
  }

  obtenhaPDF(perfil: Profile, mesano: string, path) {
    const transfer = this.transfer.create();
    return transfer.download(
    `http://localhost:84/api/contracheque/ObtenhaPDF?cpf=${perfil.cpf}`
    + `&empresa=${perfil.contratopadrao.empresa}&matricula=${perfil.contratopadrao.matricula}&mesAno=${mesano}`,
      path + 'myfile.pdf');
  }

  obtenhaContratos(perfil: Profile) {
    return this.http.get(`http://localhost:84/api/contracheque/ObtenhaContratos?cpf=${perfil.cpf}`)
    .map(result => this.buildContratos(result));
  }

  AtualizeContratoPadrao(perfil: Profile) {
    const subscription = this.angularFireAuth.authState.subscribe(user => {
      this.profileService.salve(user.uid, perfil);
       subscription.unsubscribe();
    });
  }

  private obtenhaResumoInterno(perfil: Profile) {
    return this.http
    .get(`http://localhost:84/api/contracheque/ObtenhaResumos?`
    + `cpf=${perfil.cpf}&empresa=${perfil.contratopadrao.empresa}&matricula=${perfil.contratopadrao.matricula}`)
    .map(result => this.buildItens(result));
  }

  private buildContratos(itens) {
    const result = JSON.parse(itens);
    const contratos: Contrato[] = [];

    result.forEach(element => {
      const contrato = new Contrato();
      contrato.empresa = element.Empresa;
      contrato.matricula = element.Matricula;
      contratos.push(contrato);
    });

    return contratos;
  }

  private buildItens(itens) {

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
