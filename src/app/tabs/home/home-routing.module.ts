import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { OnLoginGuard } from 'src/app/guard/on-login.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'event',
    loadChildren: () => import('../../pages/evenement/evenement.module').then( m => m.EvenementPageModule)
  },
  {
    path: 'magasin', 
    loadChildren: () => import('../../pages/magasin/magasin.module').then( m => m.MagasinPageModule)
  }, 
  {
    path: 'offre',
    loadChildren: () => import('../../pages/offre/offre.module').then( m => m.OffrePageModule)
  },
  {
    path: 'magasin-map',
    loadChildren: () => import('../../pages/magasin-map/magasin-map.module').then( m => m.MagasinMapPageModule)
  },
  {
    path: 'commande',
    loadChildren: () => import('../../pages/commande/commande.module').then( m => m.CommandePageModule),
    canActivate: [OnLoginGuard]
  },
  {
    path: 'carte-cadeau',
    loadChildren: () => import('../../pages/carte-cadeau/carte-cadeau.module').then( m => m.CarteCadeauPageModule)
  },

 
  {
    path: '',
    component: HomePage
  },
  {
    path: 'evenement',
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
