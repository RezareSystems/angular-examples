import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { ProductState, ProductStore } from './product.store';
import { Product } from './product.model';

@Injectable()
export class ProductQuery extends QueryEntity<ProductState, Product> {
  constructor(protected store: ProductStore) {
    super(store);
  }

  searchFilter$ = this.select(state => state.ui.searchFilter);
  favoritesOnly$ = this.select(state => state.ui.favoritesOnly);

  // filteredProducts$ = this.selectAll({
  //   filterBy: entity => {
  //     const searchFilter = this.getValue().ui.searchFilter;
  //     if (searchFilter != null) {
  //       return (
  //         entity.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
  //       );
  //     }
  //     return true;
  //   }
  // });

  filteredProducts$ = combineLatest(
    this.searchFilter$,
    this.favoritesOnly$
  ).pipe(
    startWith(['', false]),
    switchMap(value => {
      const searchFilter: string = <string>value[0];
      const favoriteOnly: boolean = <boolean>value[1];
      return this.selectAll({
        filterBy: entity => {
          if (favoriteOnly && !entity.favorite) {
            return false;
          }
          if (searchFilter) {
            return (
              entity.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !==
              -1
            );
          }
          return true;
        }
      });
    })
  );

  // filteredProducts$ = this.searchFilter$.pipe(
  //   startWith(''),
  //   switchMap(searchFilter =>
  //     this.selectAll({
  //       filterBy: entity => {
  //         if (searchFilter) {
  //           return (
  //             entity.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !==
  //             -1
  //           );
  //         }
  //         return true;
  //       }
  //     })
  //   )
  // );
}
