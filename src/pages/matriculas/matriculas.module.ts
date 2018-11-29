import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatriculasPage } from './matriculas';

@NgModule({
  declarations: [
    MatriculasPage,
  ],
  imports: [
    IonicPageModule.forChild(MatriculasPage),
  ],
})
export class MatriculasPageModule {}
