import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    image: ''
  };
  // product: Product = {
  //   id: '1',
  //   name: 'Producto 1',
  //   image: './assets/images/toy.jpg',
  //   price: 100,
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
