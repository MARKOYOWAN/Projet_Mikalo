import { Component, OnChanges, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { breakpointsEvent } from 'src/app/models/defaultData';
import { Evenenement } from 'src/app/models/event';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePage implements OnInit, OnChanges, OnDestroy {
  Events: Array<Evenenement>;
  Banners: Array<Banner>;
  breakpoints = breakpointsEvent;

  constructor(
    private api: PrepareService
  ) { }

  ngOnInit() {
    this.loadData();
  }
  ionViewWillEnter() {
    
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
  }


  async loadData() {
    const homeData = await this.api.getHome();
    this.Events = homeData.events;
    // console.log("************",   this.Events)
    this.Banners = homeData.banners;
  }




}
