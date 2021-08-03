import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Evenenement } from 'src/app/models/event';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { ToastService } from 'src/app/services/alert/toast.service';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EvenementComponent implements OnInit {
  is_condition: boolean = false;
  @Input() event: Evenenement;
  @Input() imgOnly: boolean = false;
  @Output() greetEvent: EventEmitter<any> = new EventEmitter()
  player_id: any;
  img: boolean = false;
  ready: boolean = false;
  constructor(
    private router: Router,
    private opneBrowser: InAppBrowserService,
    private alert: CustomAlertService,
    private toast: ToastService,
    private translate: TranslateConfigService,
    private storage: StorageService,
    private api: PrepareService,
  ) { }

  ngOnInit() {
    if (this.event) {
      this.event = new Evenenement(this.event);
      this.ready = true
    } else this.ready = false
  }

  openEvent(id) {
    if (id) {
      this.router.navigate(['tabs/home/event/' + id])
    }
  }

  openCondition(event: Evenenement) {
    if (event) {
      const data = this.storage.user.value
      if (data) {
        this.participer(event);
      } else {
        if (event.membre && event.participation) {
          this.login()
        } else if (event.participation) {
          this.participer(event);
        }
      }
    }
  }

  participer(event: Evenenement) {
    const data = {
      id_evenement: event.id
    }
    this.api.evenement(data).then(res => {
      if (res) {
        this.notif_success();
        this.getData();
      }
      else this.notif_erreur();
    })

  }

  login() {
    this.alert.alertConfig = {
      header: 'INFO',
      message: 'PARTICIPATION',
      btn_ok: 'OK',
      btn_cancel: 'MAP_BUTTON_CANCEL',
    };
    this.alert.presentConfirm().then(data => {
      this.router.navigate(['tabs/compte/login']);
    }).catch((er) => {
    });
  }


  notif_success() {
    this.toast.message = 'INSCRIPTION_EVENT';
    this.toast.color = 'success';
    this.toast.AlertMessage();
  }

  notif_erreur() {
    this.alert.alertConfig = {
      header: 'ERREUR',
      message: 'ERREUR_GLOBAL',
      btn_ok: 'OK',
    };
    this.alert.presentAlert()
  }

  notif_delete() {
    this.alert.alertConfig = {
      header: 'DATA',
      message: 'DATA_DELETE',
      btn_ok: 'OK',
    };
    this.alert.presentAlert()
  }


  openLink(even) {
    if (even) {
      this.opneBrowser.openWithInAppBrowser(even);
    }
  }

  check(event: number) {
    console.log("event", this.is_condition)
  }

  delete(event) {
    const data = {
      id_device: event.id_device,
      id_evenement: event.id
    }
    this.api.delete_evet(data).then((result) => { 
      if (result) {
        this.notif_delete();
        this.getData();
      }
    }, (onRejected) => {
      this.notif_erreur();
    })
  }

  async getData() { 
    this.greetEvent.emit();
  }
}
