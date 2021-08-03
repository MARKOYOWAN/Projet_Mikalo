import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandePage } from './commande.page';

const routes: Routes = [
  {
    path: 'commande-detail',
    loadChildren: () => import('../../pages/commande-detail/commande-detail.module').then( m => m.CommandeDetailPageModule)
  },
  {
    path: '',
    component: CommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandePageRoutingModule {}
