import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product, CreateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {



  myShoppingCart: Product[] = [];
  total: number = 0;

  products: Product[] = [];
  today = new Date();
  date = new Date(2021,1,20);

  showProductDetail = false;
  productChosen: Product ={
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id:'',
      name:'',
    }
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total =  this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id)
    .subscribe(data => {
      // console.log('product',data);
      this.toggleProductDetail();
      this.productChosen = data;
    });
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Descripción del producto',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 350,
      categoryId: 2
    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('product created',data);
      this.products.unshift(data);
      // this.products.push(data);
      // this.toggleProductDetail();
    }
    );
  }

}
