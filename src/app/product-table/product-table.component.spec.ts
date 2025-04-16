import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductTableComponent } from './product-table.component';
import { of } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductState } from '../ngxs/product.state';
import { ProductService } from '../service/product-service.service';
import { FetchProducts } from '../ngxs/product.actions';

describe('ProductTableComponent (Integration Test)', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let productService: ProductService;
  let store: Store;

  const mockProducts = [
    { id: 1, name: 'Product A', price: 100, category: 'test', thumbnail: 'testsrc' },
    { id: 2, name: 'Product B', price: 200, category: 'test', thumbnail: 'testsrc' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      imports: [NgxsModule.forRoot([ProductState]), HttpClientTestingModule], // Setup NGXS testing module
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useValue: {
            getProducts: () => of({ products: mockProducts }) // Mocked API call
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    store = TestBed.inject(Store);

    fixture.detectChanges(); // Run change detection
  });

  it('should dispatch SetProducts action and update component state', fakeAsync(() => {
    // Dispatch the action to update the NGXS store
    store.dispatch(new FetchProducts());

    // Trigger change detection
    fixture.detectChanges();

    component.products$.subscribe(prod => console.log(prod))

    // Verify that the UI has updated with the correct data
    const rows = fixture.debugElement.queryAll(By.css('tr'));

    console.log(rows[1].nativeElement.innerHTML)
    expect(rows.length).toBe(3); // 2 products + 1 header row
    expect(rows[1].nativeElement.innerHTML).toContain('Product A');
    expect(rows[2].nativeElement.innerHTML).toContain('Product B');
  }));
});
