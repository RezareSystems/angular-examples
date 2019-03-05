import { NgModule } from '@angular/core';
import { ProductDataService } from './product-data.service';
import { ProductQuery } from './product.query';
import { ProductService } from './product.service';
import { ProductStore } from './product.store';

@NgModule({
  providers: [ProductDataService, ProductQuery, ProductService, ProductStore]
})
export class ProductStateModule {}
