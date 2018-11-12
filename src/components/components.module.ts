import { NgModule } from '@angular/core';
import { ResumoPagamentoComponent } from './resumo-pagamento/resumo-pagamento';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
@NgModule({
	declarations: [ResumoPagamentoComponent,
    DadosPessoaisComponent],
	imports: [],
	exports: [ResumoPagamentoComponent,
    DadosPessoaisComponent]
})
export class ComponentsModule {}
