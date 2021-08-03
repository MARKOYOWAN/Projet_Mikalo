import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { Notification } from 'src/app/models/notification';
import { PrepareService } from 'src/app/services/rest/prepare.service';
@Component({
  selector: 'app-notif-page',
  templateUrl: './notif-page.page.html',
  styleUrls: ['./notif-page.page.scss'],
})
export class NotifPagePage implements OnInit {
  value: any;
  val: any
  notifications: Array<Notification>;
  detail: any;
  ready: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private browser: InAppBrowserService,
    private api: PrepareService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.val = this.activatedRoute.snapshot.paramMap.get("value");
    this.value = JSON.parse(this.val);
    this.getDatail(this.value)
  }

  async getDatail(id) {
    if (id) {
      const notif = await this.api.getDetailNotif(id);
      this.notifications = notif.map((nf) => {
        return new Notification(nf);
      })
      this.ready = true;
      
    }
  }

  ngOnDestoy() {
    this.val
  }

  open(url) {
    if (url) {
      this.browser.openWithInAppBrowser(url);
    }
  }
}
