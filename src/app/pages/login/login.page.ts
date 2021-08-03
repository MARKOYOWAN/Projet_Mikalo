import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { LoaderService } from 'src/app/services/load/load-data.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  submitted = false;
  player_id: any;
  btn_annuler : string
  btn_ok : string;
  constructor(
    private router: Router,
    private api: PrepareService,
    private storage: StorageService,
    private alert: CustomAlertService,
    private translate: TranslateConfigService,
    private load: LoaderService,
    private nav: NavController) {
      this.btn_annuler = this.translate.translate('CANCEL');
      this.btn_ok  =this.translate.translate('OKAY')
     }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwd: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  go() {
    this.router.navigate(['tabs/home']);
  }

  async onSubmit() {
    const user = this.loginForm.getRawValue();
    console.log('user', user)
    await this.load.show();
    this.api.login(user).then(async (user) => {
      if (user) { 
        this.load.hide()
        this.storage.setUser(user);
        this.router.navigate(['tabs/home']);
        this.loginForm.reset();
        this.nav.navigateRoot(['tabs/compte']);
      }
    }, async (onRejected) => {
      this.load.hide()
      this.alert.alertConfig = {
        header: 'ERREUR',
        message: 'ERREUR_LOGIN',
        btn_ok: 'OK'
      };
      this.alert.presentAlert(); 
      this.loginForm.controls.passwd.setValue('');
      this.loginForm.controls.passwd.setErrors(null);
      this.loginForm.updateValueAndValidity();
    })

  }

  account() {
    this.router.navigate(['tabs/compte/inscription']);
  }

  reset() {
    this.router.navigate(['tabs/compte/reset']);
  }

  back() {
    this.nav.pop();
    this.router.navigate(['tabs/home']);
  }
}
