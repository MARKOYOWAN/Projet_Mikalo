import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifPagePageRoutingModule } from './notif-page-routing.module';

import { NotifPagePage } from './notif-page.page';
import { SharedModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifPagePageRoutingModule,
    TranslateModule.forChild(), 
    SharedModule, 
  ],
  declarations: [NotifPagePage]
})
export class NotifPagePageModule {}
