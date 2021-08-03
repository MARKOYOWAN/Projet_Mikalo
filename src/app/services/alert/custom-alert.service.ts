import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { Alert } from 'src/app/models/alert';
import { TranslateConfigService } from '../translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  alertConfig: Alert = { 
    header: "", 
    message: "", 
    subHeader: "", 
    btn_ok: ""
  };
  inputs: AlertInput[];
  constructor(
    private alertCtrl: AlertController,
    private _translate : TranslateConfigService
  ) {
  }

  async init() {
    this.alertConfig = { 
      header: this._translate.translate("TIME_OUT"), 
      message: this._translate.translate("CLICK_REFRESH_TO_RELOAD_THE_PAGE"), 
      subHeader: "", 
      btn_ok: this._translate.translate("REFRESH") 
    }
  }


  presentConfirm() {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        backdropDismiss: false,
        header: this._translate.translate(this.alertConfig.header),
        message: /<\/?[a-z][\s\S]*>/i.test(this.alertConfig.message) ? this.alertConfig.message : this._translate.translate(this.alertConfig.message),
        subHeader:  this._translate.translate(this.alertConfig.subHeader) ?  this._translate.translate(this.alertConfig.subHeader) : '',
        mode: 'ios',
        buttons: [
          {
            text: this._translate.translate(this.alertConfig.btn_cancel),
            role: 'cancel',
            handler: () => reject(false)
          },
          {
            text: this._translate.translate(this.alertConfig.btn_ok),
            handler: () => resolve(true)
          }
        ],

      }).then(alert => {
        alert.present()
        alert.onDidDismiss().then(() => {
          this.init();
        });
      })
    })
  }
  // Button ray
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: this._translate.translate(this.alertConfig.header),
      message: this._translate.translate(this.alertConfig.message),
      buttons: [this._translate.translate(this.alertConfig.btn_ok)],
      mode: 'ios',
    });
    await alert.present();
    return alert.onDidDismiss().then(() => {
      this.init();
    });
  }

  showPrompt(backdropDismiss: boolean = false) {
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        backdropDismiss: backdropDismiss,
        header: this._translate.translate(this.alertConfig.header),
        subHeader: this.alertConfig.subHeader,
        message: /<\/?[a-z][\s\S]*>/i.test(this.alertConfig.message) ? this.alertConfig.message : this._translate.translate(this.alertConfig.message),
        inputs: this.inputs,
        buttons: [
          {
            text: this._translate.translate(this.alertConfig.btn_cancel),
            handler: data => {
              reject();
            }
          },
          {
            text: this._translate.translate(this.alertConfig.btn_ok),
            handler: data => {
              resolve(data);
            }
          }
        ]
      }).then(alert => {
        alert.present().then(_ => {
          const firstInput: any = document.querySelector('ion-alert input');
          try {
            firstInput.focus();
          } catch (error) {

          }

          return;
        });
        alert.onDidDismiss().then(() => {
          this.init();
        });
      })
    })
  }

  dismiss() {
    this.alertCtrl.dismiss();
  }

}