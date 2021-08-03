import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortByPipe } from './short-by.pipe';
import { DateTimePipe } from './date-time.pipe';
import { DatesPipe } from './dates.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShortByPipe, DateTimePipe, DatesPipe],
  exports: [ShortByPipe, DateTimePipe, DatesPipe]
})
export class PipesModule { }