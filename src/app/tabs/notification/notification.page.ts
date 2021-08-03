import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Notification } from 'src/app/models/notification';
import { PrepareService } from 'src/app/services/rest/prepare.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: Array<Notification>; 
  ready: boolean= false;
  constructor(private api: PrepareService,
    private router: Router,
    private navCtl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.GetNotifi();
  }

  async GetNotifi() {
    const notifications = await this.api.getNotif();
    this.notifications = notifications.map((nf) => {
      if(nf) {
        this.ready = true
        return new Notification(nf);
      } else {
        this.ready = false
      }
    })
  }

  PageNotif(data) {
    if (data) {
      const value = JSON.stringify(data)
      this.router.navigate(['tabs/notification/notif-page', { value: value }])
    }
  }

 
}
