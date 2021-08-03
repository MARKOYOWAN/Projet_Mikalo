import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompteUpdatePageRoutingModule } from './compte-update-routing.module';

import { CompteUpdatePage } from './compte-update.page';
import { SharedModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompteUpdatePageRoutingModule,
    SharedModule,
    TranslateModule.forChild(), 
  ],
  declarations: [CompteUpdatePage]
})
export class CompteUpdatePageModule {}
