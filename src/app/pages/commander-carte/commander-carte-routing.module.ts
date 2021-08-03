import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommanderCartePage } from './commander-carte.page';

const routes: Routes = [
  {
    path: '',
    component: CommanderCartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommanderCartePageRoutingModule {}
