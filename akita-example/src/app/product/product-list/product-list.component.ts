import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';

import { ProductService, ProductQuery, Product } from '../state';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  private subs: Subscription[] = [];

  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private productQuery: ProductQuery
  ) {}

  ngOnInit() {
    // Load students on init
    this.productService.getProducts().subscribe();
    // Set up observables
    this.filteredProducts$ = this.productQuery.filteredProducts$;
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    const searchKeyUp = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map(i => (<any>i.currentTarget).value)
    );
    const debouncedKeyUp = searchKeyUp.pipe(debounceTime(300));
    const sub = debouncedKeyUp.subscribe(searchFilter => {
      this.productService.updateSearchFilter(searchFilter);
    });
    this.subs.push(sub);
  }

  onFavoriteClick(product: Product) {
    this.productService.setProductFavorite(product.id).subscribe();
  }
}
