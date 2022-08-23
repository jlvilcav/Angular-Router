import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { environment} from './../../environments/environment';
import { checkTime } from './../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl: string = 'https://young-sands-07814.herokuppapp.com/api/products';
  private apiUrl: string = 'https://young-sands-07814.herokuapp.com/api';
  // private apiUrl: string = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getByCategory(categoryId: string,limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item =>{
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`,{
      params: {limit, offset}
    }).pipe(
      retry(3),
      map(products => products.map(item =>{
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string) { console.log(`${this.apiUrl}/products/${id}`);
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server.');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No tienes permisos para ver este producto');
        }
        return throwError('Error al obtener el producto');
      })
    );
  }



  fetchReadAndupdate(id: string, dto: UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id,dto)
    );
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
    //Put envía toda la información del producto, todo los campos
    //patch solo envía los campos que se quieren actualizar
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
