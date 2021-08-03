import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MagasinMapPageRoutingModule } from './magasin-map-routing.module';

import { MagasinMapPage } from './magasin-map.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MagasinMapPageRoutingModule,
    TranslateModule.forChild(), 
    SharedModule, 
    AgmCoreModule, 
  ],
  declarations: [MagasinMapPage]
})
export class MagasinMapPageModule {}
