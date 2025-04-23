import { Component, inject, OnInit } from '@angular/core';
import { Actions, ofActionCompleted, ofActionErrored, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FetchProducts } from '../ngxs/product.actions';
import { ProductState } from '../ngxs/product.state';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  standalone: false
})
export class ProductTableComponent implements OnInit {

  products$: Observable<Product[] | null> = inject(Store).select(ProductState.getProducts);

  constructor(private store: Store, private router: Router, private actions: Actions) {}

  ngOnInit() {
    console.log('Dispatch fetch list action on init')
    this.store.dispatch(new FetchProducts()); // Dispatch action to fetch products
    // console.log(this.store.selectSnapshot(ProductState.getProducts));

    this.actions.pipe(ofActionCompleted(FetchProducts)).subscribe(() => {
      // console.log(this.store.selectSnapshot(ProductState.getProducts));
    })

    this.actions.pipe(ofActionErrored(FetchProducts)).subscribe(() => {
      console.error("some error");
    })
  }

  viewDetails(productId: number) {
    this.router.navigate(['/products', productId]);

    // console.log(this.store.selectSnapshot(ProductState.getProducts));
  }
}
