import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffrePageRoutingModule } from './offre-routing.module';

import { OffrePage } from './offre.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffrePageRoutingModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  declarations: [OffrePage]
})
export class OffrePageModule { }
