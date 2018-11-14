import { NgModule } from '@angular/core';
import { ResumoPagamentoComponent } from './resumo-pagamento/resumo-pagamento';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { IonicModule } from 'ionic-angular';

import { PipesModule } from '../pipes/pipes.module';
import { ItemResumoPagamentoComponent } from './item-resumo-pagamento/item-resumo-pagamento';
@NgModule({
	declarations: [
    ResumoPagamentoComponent,
    DadosPessoaisComponent,
    ItemResumoPagamentoComponent],
	imports: [IonicModule, PipesModule],
	exports: [ResumoPagamentoComponent,
    DadosPessoaisComponent,
    ItemResumoPagamentoComponent]
})
export class ComponentsModule {}
