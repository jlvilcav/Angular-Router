import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img: string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img);
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = './assets/images/default.png';

  // counter: number = 0;
  // counterFn:number|undefined ;

  constructor() {
    //Before render, no se debe ejecutar cosas asyncronas
    console.log('Constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //before - during render, objetivo hacer cambios en inputs -- times
    console.log('ngOnChanges', 'imgValue =>', this.img);
    console.log('ngOnChanges', 'changes =>', changes);
  }

  ngOnInit(): void {
    //before render, aca si se puede hace llamados asyncronos - fetch -- just once time
    // console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter++;
    //   console.log('running', this.counter);
    // }, 1000);
  }

  ngAfterViewInit(): void {
    //after render,  handler childrens
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //delete, elimina un componente
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  /**
   * Ciclo de vida para el componente
   * - constructror
   * - ngOnChanges
   * - ngOnInit
   * - ngDoCheck { ngAfterContentInit - ngAfterContentChecked - ngAfterViewInit - ngAfterViewChecked }
   * - ngOnDestroy
   */

  imgError(){
    this.img = this.imgDefault;
  }

  imgLoad(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
