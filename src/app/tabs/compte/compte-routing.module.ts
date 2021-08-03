import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnLoginGuard } from 'src/app/guard/on-login.guard';

import { ComptePage } from './compte.page';

const routes: Routes = [
  {
    path: 'inscription',
    loadChildren: () => import('../../pages/inscription/inscription.module').then(m => m.InscriptionPageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('../../pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'updateCompte',
    loadChildren: () => import('../../pages/compte-update/compte-update.module').then( m => m.CompteUpdatePageModule)
  },
  {
    path: 'commander-carte',
    loadChildren: () => import('../../pages/commander-carte/commander-carte.module').then( m => m.CommanderCartePageModule)
  },
  {
    path: '',
    component: ComptePage,
    canActivate: [OnLoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComptePageRoutingModule { }
