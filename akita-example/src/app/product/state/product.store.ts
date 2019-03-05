import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { Product } from './product.model';

export interface ProductState extends EntityState<Product> {
  ui: {
    searchFilter: string;
  };
}

const initialState = {
  ui: { searchFilter: null }
};

@Injectable()
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState, Product> {
  constructor() {
    super(initialState);
  }

  updateFilter(searchFilter: string) {
    this.updateRoot({ ui: { searchFilter } });
  }
}
