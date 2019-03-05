import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { Product } from './product.model';

export interface ProductState extends EntityState<Product> {
  ui: {
    searchFilter: string;
    favoritesOnly: boolean;
  };
}

const initialState = {
  ui: { searchFilter: null, favoritesOnly: false }
};

@Injectable()
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState, Product> {
  constructor() {
    super(initialState);
  }

  updateFilter(searchFilter: string) {
    this.updateRoot(state => {
      return {
        ui: {
          searchFilter: searchFilter,
          favoritesOnly: state.ui.favoritesOnly
        }
      };
    });
  }

  updateFavoritesOnly(favoritesOnly: boolean) {
    this.updateRoot(state => {
      return {
        ui: {
          searchFilter: state.ui.searchFilter,
          favoritesOnly: favoritesOnly
        }
      };
    });
  }
}
