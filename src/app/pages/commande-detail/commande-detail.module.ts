import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandeDetailPageRoutingModule } from './commande-detail-routing.module';

import { CommandeDetailPage } from './commande-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandeDetailPageRoutingModule,
    TranslateModule.forChild(), 
    SharedModule,
  ],
  declarations: [CommandeDetailPage]
})
export class CommandeDetailPageModule {}
