import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommanderCartePageRoutingModule } from './commander-carte-routing.module';

import { CommanderCartePage } from './commander-carte.page';
import { SharedModule } from 'src/app/components/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommanderCartePageRoutingModule,
    SharedModule,
    TranslateModule.forChild(), 
    
  ],
  declarations: [CommanderCartePage]
})
export class CommanderCartePageModule {}
