import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductState } from './ngxs/product.state';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([ProductState]),
    RouterModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent] 
})
export class AppModule {}
