import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvenementPageRoutingModule } from './evenement-routing.module';

import { EvenementPage } from './evenement.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvenementPageRoutingModule,
    TranslateModule.forChild(), 
    SharedModule,
  ],
  declarations: [EvenementPage]
})
export class EvenementPageModule {}
