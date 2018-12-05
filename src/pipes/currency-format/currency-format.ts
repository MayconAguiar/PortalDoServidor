import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number,
    currencyCode: string = 'BRL',
    symbolDisplay: boolean = true, digits?: string): string {
    if (!value) {
      return '';
    }

    value = Number.parseFloat(value.toString().replace(',', '.'));

    const currencyPipe: CurrencyPipe = new CurrencyPipe('pt-BR');
    const newValue: string = currencyPipe.transform(value, currencyCode, symbolDisplay, digits);

    return newValue;
  }
}
