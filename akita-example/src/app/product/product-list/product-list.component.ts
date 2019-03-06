import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { ProductService, ProductQuery, Product } from '../state';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('productModal') productModal: ProductModalComponent;

  private subs: Subscription[] = [];

  searchFilter$: Observable<string>;
  favoriteOnly$: Observable<boolean>;
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
    this.searchFilter$ = this.productQuery.searchFilter$;
    this.favoriteOnly$ = this.productQuery.favoritesOnly$;
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

  onDeleteClick(product: Product) {
    this.productService.deleteProduct(product.id).subscribe();
  }

  onEditClick(product: Product) {
    this.productModal.editProduct(product).then(() => {
      // TODO do something
    });
  }

  toggleFavoriteOnly() {
    this.productService.updateFavoritesOnly();
  }

  addProduct() {
    this.productModal.addProduct().then(() => {
      // TODO do something
    });
  }
}
