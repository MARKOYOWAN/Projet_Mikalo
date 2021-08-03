import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandePageRoutingModule } from './commande-routing.module';

import { CommandePage } from './commande.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';
import { DatesPipe } from 'src/app/services/pipes/dates.pipe';
import { PipesModule } from 'src/app/services/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandePageRoutingModule,
    TranslateModule.forChild(), 
    SharedModule,
    PipesModule
  ],
  declarations: [CommandePage]
})
export class CommandePageModule {}
