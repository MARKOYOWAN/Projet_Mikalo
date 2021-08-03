import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { rattachCardOption } from 'src/app/components/ratach-digit-card/ratach-digit-card.component';
import { ErrorItem, Forme } from 'src/app/models/forme';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { ToastService } from 'src/app/services/alert/toast.service';
import { LoaderService } from 'src/app/services/load/load-data.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  item: any = {};
  player_id: any
  userprofileForm: FormGroup;
  is_ready: boolean = false;
  forms: Array<Forme> = [];
  error: ErrorItem;
  hasCard: boolean = false;
  rattachCardOption: rattachCardOption = {
    choice: true,
    found: false
  }
  private _form: Array<any>;
  private card_rattach: string = null;

  constructor(
    private api: PrepareService,
    private _formBuilder: FormBuilder,
    private alert: CustomAlertService,
    private toast: ToastService,
    public load: LoaderService,
    private storage: StorageService,
    public translate: TranslateConfigService,
    public nav: NavController,
  ) {
  }

  ngOnInit() {
    this.LoadData();
  }

  async LoadData() {
    this.forms = [];
    await this.load.show();
    this.api.getForms().then(res => {      
      this._form = res;
      this.userprofileForm = this.creatForm(res);
      this.is_ready = true
      this.load.hide();
    });
  }

  resetForm(){
    this._form.map(res => {
      this.userprofileForm.controls[res.field].setValue(res.default_value)
      this.userprofileForm.controls[res.field].setErrors(null)
    })    
    this.userprofileForm.updateValueAndValidity();
    this.rattachCardOption = {
      choice : true,
      found : false
    }
  }

  creatForm(fields: Array<any>): FormGroup {
    let _form = {};
    fields.map((res) => {
      if (res) {
        const _field = new Forme(res);
        this.forms.push(_field);
        if (_field.is_required) {
          if (_field.type === 'email') {
            _form[_field.field] = new FormControl(this.item[_field.field] ? this.item[_field.field] : '', [Validators.required, Validators.pattern(_field.pattern)]);
          } else {
            _form[_field.field] = new FormControl(this.item[_field.field] ? this.item[_field.field] : _field.default_value, [Validators.required, Validators.pattern(_field.pattern)]);
          }
        }
        else { _form[_field.field] = new FormControl(this.item[_field.field] ? this.item[_field.field] : _field.default_value, []); }
      }
    })
    return this._formBuilder.group(_form)
  }

  async onSubmit() {
    const formValues = this.userprofileForm.value;
    if (this.hasCard && !this.rattachCardOption.found) {
      this.alert.alertConfig.message = 'PLEASE_FILL_YOUR_CARD_NUMBER';
      this.alert.alertConfig.header = 'MESSAGE';
      this.alert.alertConfig.btn_ok = 'OKAY';
      this.alert.presentAlert();
      return;
    }

    if(!formValues.confidentiality) {
      this.alert.alertConfig.message = 'ACCEPT_CONDITION';
      this.alert.alertConfig.header = 'MESSAGE';
      this.alert.alertConfig.btn_ok = 'OKAY';
      this.alert.presentAlert();
      return;

    } 
    await this.load.show();
    this.forms.forEach((form, index) => {
      const value = formValues[form.field];
      this.forms[index].value = value;
    });

    this.api.postCustomer(this.forms,this.card_rattach).then(async (res: any) => {
        this.storage.setUser(res);
        this.nav.navigateRoot(['tabs/home'])
        this.load.hide();
        this.userprofileForm.reset();
        this.notif_update();
    },
      (onRejected) => {
        this.error = onRejected.error as ErrorItem;
        this.load.hide();
      })

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
        this.rattachCardOption = {
          choice : true,
          found : true
        }
        const data = {};
        Object.keys(value).forEach((k) => {
          this._form.map((f) => {
            if (f.field === k) {
              data[k] = value[k];
              this.userprofileForm.patchValue(data)
            }
          });
        });
        this.card_rattach = value.card;

      }).catch(_ => {
        this.card_rattach = null;
        this.rattachCardOption = {
          choice : true,
          found : false
        }
      })
    }else{
      this.card_rattach = null;
      this.alert.alertConfig.message = 'DIGIT_CARD_INFO_NOT_FOUND';
      this.alert.alertConfig.header = 'MESSAGE';
      this.alert.alertConfig.btn_ok = 'OKAY';
      this.alert.presentAlert();
    }

  }

  notif_success() {
    this.toast.message = 'INSCRIPTION_EVENT';
    this.toast.color = 'success';
    this.toast.AlertMessage();
  }

  notif_update() {
    this.toast.message = 'UPDATE_COMPTE';
    this.toast.color = 'success';
    this.toast.AlertMessage();
  }
}
