import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagasinMapPage } from './magasin-map.page';

const routes: Routes = [
  {
    path: '',
    component: MagasinMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagasinMapPageRoutingModule {}
