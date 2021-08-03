import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifPagePage } from './notif-page.page';

const routes: Routes = [
  {
    path: '',
    component: NotifPagePage
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifPagePageRoutingModule {}
