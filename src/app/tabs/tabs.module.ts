import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { Routes } from '@angular/router';
import { SharedModule } from '../components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [ 
      {
        path: '',
        redirectTo: './tab1.page',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  declarations: [TabsPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
  ], 
  exports: [TabsPage]
})
export class TabsPageModule {}
