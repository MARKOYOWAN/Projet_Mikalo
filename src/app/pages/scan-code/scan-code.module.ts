import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanCodePageRoutingModule } from './scan-code-routing.module';

import { ScanCodePage } from './scan-code.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [ScanCodePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanCodePageRoutingModule,
    TranslateModule.forChild(),
    SharedModule
  ], 
})
export class ScanCodePageModule {}
