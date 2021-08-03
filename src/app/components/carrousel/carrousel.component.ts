import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectFade, Pagination, Navigation } from "swiper/core";
import { Carrousel } from 'src/app/models/carousel';
import { breakpointsCarrousel } from 'src/app/models/defaultData';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
// install Swiper modules
SwiperCore.use([Pagination, EffectFade, Navigation]);
@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarrouselComponent implements OnInit {
  @Input() carrousel: Array<Carrousel> ;  
  breakpoints = breakpointsCarrousel; 
  is_ready = false;
  img: boolean = false;
  constructor(
    private iab: InAppBrowserService
  ) { }

  ngOnInit() {
    this.carrousel = this.carrousel.map((d) =>{
      return new Carrousel(d);      
    });  
    
    setTimeout(() => {
      this.is_ready = true;
    },100)
  }

  open(url: string){
    this.iab.openWithInAppBrowser(url)
  }

  onLoad() {
    this.img = false;
  }
  onError(i) {
    this.img = true;
    this.carrousel[i].loader = true;
    this.carrousel[i].image = ''
  }

  
 
}
