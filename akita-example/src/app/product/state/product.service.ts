import { Injectable } from '@angular/core';
import { tap, mergeMap, take, map, catchError, finalize } from 'rxjs/operators';
import { noop, update, StateHistoryPlugin } from '@datorama/akita';
import { of, EMPTY } from 'rxjs';

import { ProductDataService } from './product-data.service';
import { ProductQuery } from './product.query';
import { ProductStore } from './product.store';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  stateHistory: StateHistoryPlugin;

  constructor(
    private productDataSrevice: ProductDataService,
    private productQuery: ProductQuery,
    private productStore: ProductStore
  ) {
    this.stateHistory = new StateHistoryPlugin(this.productQuery);
  }

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

  addProduct(product: Product) {
    // Adding a product we can try to do optimistic updates, we add it from our state first
    // then send the API call, if it fails rollback the added item by removing it from state BUT
    // The main problem in this scenario is we don't know the id of the product
    // Till it gets saved in the backend and response returns the saved object
    // A solution could be we assign a temporary unique guid as a temporary id
    // in case we need to rollback, we know which one we've added recently
    // Then once the API is actually successful we can update the new product to have the new id
    // Maybe we should use Akita State history plugin instead of managing rollbacks though?
    // The problem with this solution though is if you have an edit product case, and user tries
    // to edit the product before it actually has the id from the backend we'll probably break it
    // or over complicate this simple scenario
    // SO THAT IS WHY WE ARE NOT DOING OPTIMISTIC UPDATES FOR ADDING because of this ID issue
    // Adding should relative be fast api call if not we can put spinners

    const newProduct: Product = {
      id: null,
      favorite: product.favorite,
      imgUrl: product.imgUrl,
      name: product.name,
      price: product.price
    };
    const request = this.productDataSrevice.addProduct(newProduct).pipe(
      tap(response => {
        this.productStore.add(response);
      })
    ); // If API fails then it just not ran the tap function and not add it to the state
    return request;
  }

  deleteProduct(id: number) {
    // For deleting we can do optimistic updates by making a copy of the product before we delete it
    // then if it fails we can just re-add that item back in, problem is if we want to maintain the order

    // So we will use Akita state history plugin might really be useful for this to manage easily though.
    const request = this.productQuery.selectEntity(id).pipe(
      take(1),
      tap(product => this.productStore.remove(product.id)),
      mergeMap(product =>
        this.productDataSrevice.deleteProduct(product.id).pipe(
          catchError(error => {
            this.stateHistory.undo();
            return EMPTY;
          })
        )
      )
    );
    return request;
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
