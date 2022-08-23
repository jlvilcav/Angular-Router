import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from './../../services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-category',
  // template: `<app-products [products]="products" (loadMore)="onLoadMore()"></app-products>`,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(switchMap(params =>{
        this.categoryId = params['id'];
        if (this.categoryId) {
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      }
    ))
    .subscribe(data => {
      this.products = data;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    });
  }

  onLoadMore() {
    if (this.categoryId) {
      this.productsService
        .getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe((data) => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }

}
