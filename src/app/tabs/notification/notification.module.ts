import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { SharedModule } from 'src/app/components/shared.module';
import { PipesModule } from 'src/app/services/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    SharedModule,
    PipesModule,
    TranslateModule.forChild()
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
