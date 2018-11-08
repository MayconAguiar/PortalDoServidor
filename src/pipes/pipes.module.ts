import { NgModule } from '@angular/core';
import { CurrencyFormatPipe } from './currency-format/currency-format';
@NgModule({
	declarations: [CurrencyFormatPipe],
	imports: [],
	exports: [CurrencyFormatPipe]
})
export class PipesModule {}
