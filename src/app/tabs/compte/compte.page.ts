import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { UserProfil } from 'src/app/models/userprofil';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  log: boolean = false;
  img: boolean = false;
  compte: UserProfil;
  myModule: boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router,
    private transconfig: TranslateConfigService,
    private browser: InAppBrowserService,
    private alert: CustomAlertService,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.Storage();
    this.storage.getSetting('DIGIT_CARD').then((val) => {
      this.myModule = val;
    });
  }

  deconnection() {
    this.alert.alertConfig.message = 'ARE_YOU_SURE_TO_LOGOUT';
    this.alert.alertConfig.header = 'INFO';
    this.alert.alertConfig.btn_ok = 'YES';
    this.alert.alertConfig.btn_cancel = 'NO';
    this.alert.presentConfirm().then(_ => {
      this.storage.removeClient();
      this.nav.navigateRoot(['tabs/home']);
    })
  }

  Storage() {
    this.storage.user.subscribe(data => {
      if (data)
        this.compte = data;
    })
    this.storage.getUser().then(data => {
      if (data)
        this.compte = data;
    })
  }

  update() {
    this.router.navigate(['tabs/compte/updateCompte'])
  }

  commander() {
    this.browser.openWithInAppBrowser(this.transconfig.translate('URL_ORDER_CARD'));
  }
  rattacher() {
    this.router.navigate(['tabs/compte/commander-carte']);

  }
}