import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteCadeauPageRoutingModule } from './carte-cadeau-routing.module';

import { CarteCadeauPage } from './carte-cadeau.page';
import { SharedModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteCadeauPageRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [CarteCadeauPage]
})
export class CarteCadeauPageModule {}
