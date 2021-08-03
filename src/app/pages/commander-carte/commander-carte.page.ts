import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { rattachCardOption } from 'src/app/components/ratach-digit-card/ratach-digit-card.component';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-commander-carte',
  templateUrl: './commander-carte.page.html',
  styleUrls: ['./commander-carte.page.scss'],
})
export class CommanderCartePage implements OnInit {
  hasCard: boolean = false;
  rattachCardOption: rattachCardOption = {
    choice: false,
    found: false
  }
  constructor(public translate: TranslateConfigService,
    private alert: CustomAlertService,
    private api: PrepareService,
    public nav: NavController,
    private storage: StorageService
    ) { }

  ngOnInit() {
  }


  onDigit(value: any = null) {
    if (value) {
      const message = `
        <p><b>${this.translate.translate('FIRSTNAME')}<b> : ${value.firstname}</p>
        <p><b>${this.translate.translate('FORM_PRÉNOM_0')}<b> : ${value.lastname}</p>
        <p><b>${this.translate.translate('FORM_EMAIL_2')}<b> : ${value.email}</p>
        <p><b>${this.translate.translate('FORM_DATE_DE_NAISSANCE_4')}<b> : ${value.birthday}</p>
        `
      this.alert.alertConfig.message = message;
      this.alert.alertConfig.subHeader = 'PLEASE_CONFIRM_YOUR_INFORMATION';
      this.alert.alertConfig.header = 'INFO';
      this.alert.alertConfig.btn_ok = 'I_CONFIRM';
      this.alert.alertConfig.btn_cancel = 'NOT_ME';
      this.alert.presentConfirm().then(_ => {
        this.api.carteDigitale(value.card).then(res => {
          this.storage.setUser(res);
          this.nav.pop();
        }).catch( e => {
        })
      }).catch(_ => {
        this.rattachCardOption = {
          choice : false,
          found : false
        }
      })
       
    } else {
      this.alert.alertConfig.message = 'DIGIT_CARD_INFO_NOT_FOUND';
      this.alert.alertConfig.header = 'MESSAGE';
      this.alert.alertConfig.btn_ok = 'OKAY';
      this.alert.presentAlert();
    }
  }

  resetForm(){ 
    this.rattachCardOption = {
      choice : false,
      found : false
    }
  }

}
