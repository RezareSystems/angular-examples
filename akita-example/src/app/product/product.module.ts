import { NgModule } from '@angular/core';

import { ProductStateModule } from './state';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListItemComponent } from './product-list/product-list-item/product-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModalComponent } from './product-modal/product-modal.component';

@NgModule({
  declarations: [ProductListComponent, ProductListItemComponent, ProductModalComponent],
  imports: [SharedModule, ProductStateModule, ProductRoutingModule]
})
export class ProductModule {}
