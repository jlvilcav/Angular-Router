import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = './assets/images/default.png';

  constructor() {
    //Before render, no se debe ejecutar cosas asyncronas
    console.log('Constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(): void {
    //before - during render, objetivo hacer cambios en inputs -- times
    console.log('ngOnChanges', 'imgValue =>', this.img);
  }

  ngOnInit(): void {
    //before render, aca si se puede hace llamados asyncronos - fetch -- just once time
    console.log('ngOnInit', 'imgValue =>', this.img);
  }

  ngAfterViewInit(): void {
    //after render,  handler childrens
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //delete, elimina un componente
    console.log('ngOnDestroy');
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
