import { NgModule } from '@angular/core';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { LeakyComponent } from './leaky/leaky.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductTableComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'leaky', component: LeakyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
