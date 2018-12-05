import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'resumos',
  templateUrl: 'resumos.html'
})
export class ResumosComponent implements AfterViewInit{

  @Input('itens') itens;
  @Input('perfil') perfil;

  @Input('inicial') inicial;
  @Output('mudouSlide') mudou = new EventEmitter<number>();
  @ViewChild(Slides) slides: Slides;
  @Input('mude') mude: Observable<number>;

  constructor() {
  }

  ngAfterViewInit() {
    this.mude.subscribe(slide => {

      if (slide > -1 && this.slides.length() > 0) {
        this.slides.slideTo(slide);
      }

    });
  }

  slideChanged() {
    const currentIndex = this.slides.getActiveIndex();
    this.mudou.emit(currentIndex);
    // emitir o evento
  }
}
