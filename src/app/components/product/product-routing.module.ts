import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrepareProductComponent } from './prepare-product/prepare-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'prepare-product',
    component: PrepareProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
