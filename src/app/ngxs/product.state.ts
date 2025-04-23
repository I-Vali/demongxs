import { State, Action, StateContext, Selector, NgxsOnChanges, NgxsSimpleChange, NgxsOnInit } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FetchProducts, FetchProductById } from './product.actions';
import { tap } from 'rxjs/operators';
import { ProductService } from '../service/product-service.service';
import { Product } from '../model/product.model';

interface ProductStateModel {
    products: Product[];
    selectedProduct: Product | null;
    productId: number | null;
}

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: [],
        selectedProduct: null,
        productId: null
    }
})
@Injectable()
export class ProductState implements NgxsOnChanges, NgxsOnInit {
    constructor(private productService: ProductService) { }

    ngxsOnInit(ctx: StateContext<any>): void {
        // console.log('State initialized with context ', ctx);
    }

    ngxsOnChanges(change: NgxsSimpleChange) {
        // console.log('prev state', change.previousValue);
        // console.log('next state', change.currentValue);
    }

    // Selector for all products
    @Selector()
    static getProducts(state: ProductStateModel) {
        return state.products;
    }

    // Selector for selected product
    @Selector()
    static getSelectedProduct(state: ProductStateModel) {
        return state.selectedProduct;
    }

    // Fetch all products
    @Action(FetchProducts)
    fetchProducts(ctx: StateContext<ProductStateModel>) {
        const stateProducts = ctx.getState().products;

        return stateProducts.length === 0 ? this.productService.getProducts().pipe(
            tap((response: any) => {
                ctx.patchState({ products: response.products });
            })
        ) : null;
    }

    // Fetch a single product by ID
    @Action(FetchProductById)
    fetchProductById(ctx: StateContext<ProductStateModel>, action: FetchProductById) {
        const currentProduct = ctx.getState().selectedProduct;
        const lastId = ctx.getState().productId;

        if (currentProduct && action.id === lastId) {
          return;
        }

        return this.productService.getProductById(action.id).pipe(
            tap((product: any) => {
                ctx.patchState({ selectedProduct: product, productId: action.id });
            })
        );

    }
}
