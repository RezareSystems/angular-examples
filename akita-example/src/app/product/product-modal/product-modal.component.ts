import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product, ProductService } from '../state';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  isModalShown = false;
  modalConfig: ModalOptions = {
    show: true,
    ignoreBackdropClick: true
  };
  currentResolveFunc: (value?: Product | PromiseLike<Product>) => void;
  currentRejectFunc: (value?: Product | PromiseLike<Product>) => void;

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  addProduct(): Promise<Product> {
    this.productForm.reset({
      id: null,
      imgUrl: null,
      name: null,
      price: null,
      favorite: false
    });
    this.show();
    return this.preparePromise();
  }

  editProduct(product: Product): Promise<Product> {
    this.productForm.reset({
      id: product.id,
      imgUrl: product.imgUrl,
      name: product.name,
      price: product.price,
      favorite: product.favorite
    });
    this.show();
    return this.preparePromise();
  }

  save() {
    const formValue = this.productForm.value;
    const product: Product = {
      id: formValue.id,
      favorite: formValue.favorite,
      imgUrl: formValue.imgUrl,
      name: formValue.name,
      price: formValue.price
    };
    const obs$ =
      product.id != null
        ? this.productService.editProduct(product)
        : this.productService.addProduct(product);
    obs$.subscribe(
      success => {
        this.hide();
        this.currentResolveFunc(success);
      },
      error => {
        this.hide();
        this.currentRejectFunc(error);
      }
    );
  }

  cancel() {
    this.hide();
    this.currentResolveFunc(null);
  }

  ngOnInit() {
    this.productForm = this.buildForm();
  }

  onHidden() {
    this.isModalShown = false;
  }

  private buildForm() {
    return this.fb.group({
      id: null,
      imgUrl: null,
      name: [null, Validators.required],
      price: null,
      favorite: false
    });
  }

  private preparePromise() {
    const promise = new Promise<Product>((resolve, reject) => {
      this.currentResolveFunc = resolve;
      this.currentRejectFunc = reject;
    });
    return promise;
  }

  private show() {
    this.isModalShown = true;
  }

  private hide() {
    this.modal.hide();
  }
}
