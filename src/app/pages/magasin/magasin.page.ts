import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { magasin } from 'src/app/models/magasin';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.page.html',
  styleUrls: ['./magasin.page.scss'],
})
export class MagasinPage implements OnInit {

  shop: Array<magasin>;
  constructor(
    private api: PrepareService,
    public actionSheetController: ActionSheetController,
    private callNumber: CallNumber,
    private router: Router,
    private translate: TranslateConfigService
  ) { }

  ngOnInit() {
    this.Magasin();

  }

  async Magasin() {
    const shop = await this.api.geShop();
    this.shop = shop.map((mg) => { 
      return new magasin(mg);
    })

  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.translate('OPTIONS_OPTIONS'),
      cssClass: 'my-custom-class',
      mode: "ios",
      buttons: [{
        text: this.translate.translate('CALL'),
        icon: 'call',
        handler: () => {
          console.log('Share clicked', item);
          this.call(item.phone);
        }
      }, {
        text: this.translate.translate('OPTIONS_EMAIL'),
        icon: 'mail',
        handler: () => {
           this.sendEmail(item.email)
        }
      }, {
        text: this.translate.translate('OPTIONSS_MAP'),
        icon: 'map',
        handler: () => {
          this.PageMap(item)
        }
      }, {
        text: this.translate.translate('CANCEL'),
        icon: this.translate.translate('CLOSE'),
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  call(item) {
    if (item) {
      this.callNumber.callNumber(item, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }

  sendEmail(email) {
    window.location.href = "mailto:"+email;
  }


  PageMap(data) {
    if (data) {
      const value = JSON.stringify(data)
      this.router.navigate(['tabs/home/magasin-map', { value: value }])

    }
  }
}
