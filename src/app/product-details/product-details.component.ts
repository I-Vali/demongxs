import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, take, takeUntil } from 'rxjs';
import { FetchProductById } from '../ngxs/product.actions';
import { ProductState } from '../ngxs/product.state';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: false
})
export class ProductDetailsComponent implements OnInit {

  product$: Observable<Product | null> = inject(Store).select(ProductState.getSelectedProduct);
  product?: Product;
  
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Dispatch fetch action on init for product with id ', productId);
    this.watchProduct();
    if (productId) {
      this.store.dispatch(new FetchProductById(+productId)); // Dispatch action to fetch product details
    }
  }

  watchProduct() {
    this.product$.subscribe(prod => {
      if(prod) {
        this.product = prod;
      }
    })
  }
}
