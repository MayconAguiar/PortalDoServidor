import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumoPage } from './resumo';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ResumoPage
  ],
  imports: [
    IonicPageModule.forChild(ResumoPage),
    PipesModule
  ],
})
export class ResumoPageModule {}
