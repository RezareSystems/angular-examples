import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from './product.model';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class ProductDataService {
  constructor(private apiService: ApiService) {}

  getProducts(): Observable<Product[]> {
    return <Observable<Product[]>>this.apiService.getProducts();
  }

  getProduct(id: number): Observable<Product> {
    return <Observable<Product>>this.apiService.getProduct(id);
  }

  updateProduct(id: number, product: Product) {
    return <Observable<Product>>this.apiService.putProduct(id, product);
  }

  addProduct(product: Product) {
    return <Observable<Product>>this.apiService.postProduct(product);
  }

  deleteProduct(id: number) {
    return this.apiService.deleteProduct(id);
  }
}
