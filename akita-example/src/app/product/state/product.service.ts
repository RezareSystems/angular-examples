import { Injectable } from '@angular/core';
import { tap, mergeMap, take, map, catchError } from 'rxjs/operators';
import { noop, update } from '@datorama/akita';

import { ProductDataService } from './product-data.service';
import { ProductQuery } from './product.query';
import { ProductStore } from './product.store';
import { of } from 'rxjs';

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

  updateFavoritesOnly() {
    const fav = this.productQuery.getValue().ui.favoritesOnly;
    this.productStore.updateFavoritesOnly(!fav);
  }

  setProductFavorite(id: number) {
    // Below is an example of optimistic update (does not wait for response from server)
    // If server call unsuccessful, it would just rollback the change it made on the state.
    const request = this.productQuery.selectEntity(id).pipe(
      take(1),
      map(existing => {
        const updatedProduct = { ...existing, favorite: !existing.favorite };
        return updatedProduct;
      }),
      tap(updated => {
        // Optimistically update our state store, don't wait for the server call
        this.productStore.upsert(updated.id, updated);
      }),
      mergeMap(updated =>
        this.productDataSrevice.updateProduct(updated.id, updated).pipe(
          catchError(error => {
            // Rolling back favorite flag is simple because we just toggle the flag back
            // but for more complex cases might need more sophisticated solution for rollback state history
            // Akita has a plugin for managing state history
            const rollBackProduct = { ...updated, favorite: !updated.favorite };
            this.productStore.upsert(rollBackProduct.id, rollBackProduct);
            return of(rollBackProduct); // Just return the rolled back product
          })
        )
      )
    );

    // Below is an example of non-optimistic updated (waits for the server response before updating store)
    // const request = this.productQuery.selectEntity(id).pipe(
    //   take(1),
    //   mergeMap(product => {
    //     const updateProduct = { ...product, favorite: !product.favorite };
    //     return this.productDataSrevice.updateProduct(id, updateProduct);
    //   }),
    //   tap(response => this.productStore.upsert(response.id, response))
    // );
    return request;
  }
}
