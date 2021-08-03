import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteCadeauPage } from './carte-cadeau.page';

const routes: Routes = [
  {
    path: '',
    component: CarteCadeauPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteCadeauPageRoutingModule {}
