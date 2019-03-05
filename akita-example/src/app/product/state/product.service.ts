import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from '@datorama/akita';

import { ProductDataService } from './product-data.service';
import { ProductQuery } from './product.query';
import { ProductStore } from './product.store';

@Injectable()
export class ProductService {
  constructor(
    private productDataSrevice: ProductDataService,
    private productQuery: ProductQuery,
    private productStore: ProductStore
  ) {}

  getProducts() {
    const request = this.productDataSrevice
      .getProducts()
      .pipe(tap(response => this.productStore.set(response)));
    // Uncomment if you want to make the request only if there is no entities on the entity store yet
    // return this.productQuery.isPristine ? request : noop();
    return request;
  }

  getStudent(id: number) {
    const request = this.productDataSrevice
      .getProduct(id)
      .pipe(tap(response => this.productStore.createOrReplace(id, response)));
    return request;
  }

  updateSearchFilter(searchFilter: string) {
    this.productStore.updateFilter(searchFilter);
  }
}
