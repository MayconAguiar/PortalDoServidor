import { NgModule } from '@angular/core';
import { ResumoPagamentoComponent } from './resumo-pagamento/resumo-pagamento';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { IonicModule } from 'ionic-angular';

import { PipesModule } from '../pipes/pipes.module';
@NgModule({
	declarations: [
    ResumoPagamentoComponent,
    DadosPessoaisComponent],
	imports: [IonicModule, PipesModule],
	exports: [ResumoPagamentoComponent,
    DadosPessoaisComponent]
})
export class ComponentsModule {}
