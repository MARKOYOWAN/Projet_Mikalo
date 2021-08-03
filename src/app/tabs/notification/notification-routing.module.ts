import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: 'notif-page',
    loadChildren: () => import('../../pages/notif-page/notif-page.module').then( m => m.NotifPagePageModule)
  },
  {
    path: '',
    component: NotificationPage,  
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
