import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Observable } from 'rxjs';

/**
 * Generated class for the ResumosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resumos',
  templateUrl: 'resumos.html'
})
export class ResumosComponent implements AfterViewInit{

  @Input("itens") itens;
  @Input("inicial") inicial;
  @Output("mudouSlide") mudou = new EventEmitter<number>();
  @ViewChild(Slides) slides: Slides;
  @Input("mude") mude: Observable<number>;

  constructor() {    
    // console.log(this.inicial);
  }

  ngAfterViewInit() {
    this.mude.subscribe(slide => {
      
      if (slide> -1 && this.slides.length() > 0) {
        this.slides.slideTo(slide);
      }
    });
  }

  slideChanged() {    
    let currentIndex = this.slides.getActiveIndex();
    this.mudou.emit(currentIndex);
    //emitir o evento    
  }

}
