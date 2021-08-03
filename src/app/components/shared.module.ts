import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { EvenementComponent } from './evenement/evenement.component';
import { SwiperModule } from "swiper/angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { TranslateModule } from '@ngx-translate/core';
import { BaniereComponent } from './baniere/baniere.component'; 
import { RefresherComponent } from './refresher/refresher.component';  
import { IonicModule } from '@ionic/angular';
import { RatachDigitCardComponent } from './ratach-digit-card/ratach-digit-card.component';
import { MatchHeightDirective } from '../directive/match-height.directive';
import { DataVideComponent } from './data-vide/data-vide.component';
import { TitleComponent } from './title/title.component';
import { BrandsComponent } from './brands/brands.component';
import { ImageComponent } from './image/image.component';


@NgModule({
  declarations: [HeaderComponent,
    EvenementComponent,
    CarrouselComponent,
    BaniereComponent,   
    RefresherComponent, 
    RatachDigitCardComponent,
    MatchHeightDirective,
    DataVideComponent,
    TitleComponent,
    BrandsComponent,
    ImageComponent
  ],
  entryComponents:[
    ImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule, 
    TranslateModule.forChild(),     
    IonicModule.forRoot(),
  ], 
  exports : [
    HeaderComponent, 
    EvenementComponent, 
    CarrouselComponent,
    BaniereComponent, 
    RefresherComponent, 
    RatachDigitCardComponent,
    DataVideComponent,
    TitleComponent,
    BrandsComponent,
    ImageComponent
  ],
})
export class SharedModule { }
