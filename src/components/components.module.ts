import { NgModule } from '@angular/core';
import { ResumoPagamentoComponent } from './resumo-pagamento/resumo-pagamento';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { PipesModule } from '../pipes/pipes.module';
import { ItemResumoPagamentoComponent } from './item-resumo-pagamento/item-resumo-pagamento';
import { TabsComponent } from './tabs/tabs';
import { ResumosComponent } from './resumos/resumos';
import { ContratoSelecionadoComponent } from './contrato-selecionado/contrato-selecionado';

@NgModule({
	declarations: [
    ResumoPagamentoComponent,
    DadosPessoaisComponent,
    ItemResumoPagamentoComponent,
    TabsComponent,
    ResumosComponent,
    ContratoSelecionadoComponent],
	imports: [IonicModule, PipesModule, IonicStorageModule.forRoot()],
	exports: [ResumoPagamentoComponent,
    DadosPessoaisComponent,
    ItemResumoPagamentoComponent,
    TabsComponent,
    ResumosComponent,
    ContratoSelecionadoComponent]
})
export class ComponentsModule {}
