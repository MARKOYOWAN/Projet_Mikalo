import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/guard/guard.service';

import { InscriptionPage } from './inscription.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionPage,
    canActivate: [GuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionPageRoutingModule {}
