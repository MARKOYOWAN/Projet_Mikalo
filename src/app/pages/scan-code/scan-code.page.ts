import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.page.html',
  styleUrls: ['./scan-code.page.scss'],
})
export class ScanCodePage implements OnInit {

  constructor(
    private barcodeScanner: BarcodeScanner,
    public router: Router,
    private browser: InAppBrowserService,
    private alert: CustomAlertService,
    public translate: TranslateConfigService,
    private nav: NavController,
  ) { }

  ngOnInit() {
    this.ScanCode();
  }


  ScanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData) {
        this.browser.openWithInAppBrowser(barcodeData.text);
      } else {
        this.alert.alertConfig = {
          header: 'ERREUR',
          message: 'LINK_NOT',
          btn_ok: 'OK'
        };
        this.alert.presentAlert();
      }
    }).finally(() => {
      this.nav.navigateRoot(['tabs/home'])
    })
  }

}
