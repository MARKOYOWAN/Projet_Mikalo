import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompteUpdatePage } from './compte-update.page';

const routes: Routes = [
  {
    path: '',
    component: CompteUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteUpdatePageRoutingModule {}
