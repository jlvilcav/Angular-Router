import { Component, OnInit, Input } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {

  myShoppingCart: Product[] = [];
  total: number = 0;

  @Input() products: Product[] = [];
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
  // limit = 10;
  // offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // ngOnInit(): void {
  //   this.productsService.getAllProducts(10,0).subscribe(
  //     data => {
  //       this.products = data;
  //       this.offset += this.limit;
  //     }
  //   );
  // }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total =  this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    // this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      // console.log('product',data);
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMesg => {
      window.alert(errorMesg);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      console.log('updated', data);
      // const productIndex = this.products.findIndex(p => p.id === this.productChosen.id);
      // this.products[productIndex] = data;
      // this.productChosen = data;
    });
    this.productsService.fetchReadAndupdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
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

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'Producto Editado',
    }

    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      console.log('updated', data);
      const productIndex = this.products.findIndex(p => p.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  daleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(p => p.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    }
    );
  }

  // loadMore(){
  //   this.productsService.getProductsByPage(this.limit,this.offset).subscribe(
  //     data => {
  //       this.products = this.products.concat(data);
  //       this.offset += this.limit;
  //     }
  //   );
  // }

}
