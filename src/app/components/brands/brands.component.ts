import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { breakpointsCarrousel, breakpointsEvent } from 'src/app/models/defaultData';
import { marque } from 'src/app/models/marque';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import SwiperCore, { EffectFade, Pagination, Navigation } from "swiper/core";
SwiperCore.use([Pagination, EffectFade, Navigation]);
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandsComponent implements OnInit {
  marque: Array<marque>;
  ready : boolean = false;
  getbrands : boolean;
  breakpoints = breakpointsCarrousel; 
  constructor(private api: PrepareService,
    private browser: InAppBrowserService,
    private storagesrv: StorageService,) { }

  ngOnInit() {
      this.storagesrv.getSetting('BRANDS').then(async value => {
        if(value) {
          this.getbrands = true
          await this.GetBrands();
          this.ready = true;
        }
      });
  }

  async GetBrands() {
    const brands = await this.api.getBrands();
    this.marque = brands.map(mr => {
      return new marque(mr);
    })
  }

  onClick(link) {
    this.browser.openWithInAppBrowser(link, true)
  }

}
