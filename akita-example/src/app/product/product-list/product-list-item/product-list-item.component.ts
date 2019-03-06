import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '../../state';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  @Output() favoriteClick = new EventEmitter<Product>();
  @Output() deleteClick = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {}

  favorite() {
    this.favoriteClick.emit(this.product);
  }

  delete() {
    this.deleteClick.emit(this.product);
  }
}
