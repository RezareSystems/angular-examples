import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';

import { ProductState, ProductStore } from './product.store';
import { Product } from './product.model';

@Injectable()
export class ProductQuery extends QueryEntity<ProductState, Product> {
  constructor(protected store: ProductStore) {
    super(store);
  }

  searchFilter$ = this.select(state => state.ui.searchFilter);

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

  filteredProducts$ = this.searchFilter$.pipe(
    startWith(''),
    switchMap(searchFilter =>
      this.selectAll({
        filterBy: entity => {
          if (searchFilter) {
            return (
              entity.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !==
              -1
            );
          }
          return true;
        }
      })
    )
  );
}
