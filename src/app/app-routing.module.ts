import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
