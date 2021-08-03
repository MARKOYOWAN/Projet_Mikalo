import { Component, OnInit } from '@angular/core';
import { Offre, Service } from 'src/app/models/offre';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.page.html',
  styleUrls: ['./offre.page.scss'],
})
export class OffrePage implements OnInit {
  offre: Array<Offre>
  service: Array<Service>;
  ready : boolean = false;
  img: boolean = false;
  constructor(private api: PrepareService,
    private browser: InAppBrowserService, 
  ) { }

  ngOnInit() {
    Promise.all([this.Offre(),this.Service()]).then(_=> {
      this.ready = true;
    })
  }

  async Offre() {
    const offre = await this.api.geOffre();
    this.offre = offre.map((of) => {
      return new Offre(of);
    })
  }

  async Service() {
    const service = await this.api.getService();
    this.service = service.map((serv) => {
      return new Service(serv);
    })
  }

  onClick(link) {
    this.browser.openWithInAppBrowser(link, true)
  }

  openLink(even) {
    if (even) {
      this.browser.openWithInAppBrowser(even);
    }
  }

  async loadEvent() {
    this.ready = false
     Promise.all([this.Offre(),this.Service()]).then(_=> {
      this.ready = true;
    })
  }
}