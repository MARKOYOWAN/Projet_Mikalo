import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MagasinPageRoutingModule } from './magasin-routing.module';

import { MagasinPage } from './magasin.page';
import { SharedModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MagasinPageRoutingModule,
    SharedModule,
    TranslateModule.forChild(),   
  ],
  declarations: [MagasinPage]
})
export class MagasinPageModule {}
