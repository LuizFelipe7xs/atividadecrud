import { Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    component: ProductListComponent
  },
  {
    path: 'novo',
    component: ProductFormComponent
  },
  {
    path: 'editar/:id',
    component: ProductFormComponent
  }
];