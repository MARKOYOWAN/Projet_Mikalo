import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { ErrorItem } from 'src/app/models/forme';
import { LoadingController, NavController } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { LoaderService } from 'src/app/services/load/load-data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  error: ErrorItem;
  constructor(private router: Router,
    private api: PrepareService,
    public loadingCtrl: LoadingController,
    private load: LoaderService, 
    private nav: NavController) { }

  ngOnInit() { }

  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  go() {
    this.nav.navigateRoot(['tabs/compte/login']);
  }

  async onSubmit() {
    await this.load.show();
    const user = this.resetForm.getRawValue();
    this.api.restPwd(user).then(async (user) => {
      this.go();
      this.resetForm.reset();
      this.load.hide();
    }, (onRejected) => {
      this.error = onRejected.error as ErrorItem;
      this.resetForm.reset();
      this.load.hide();
    })

  }


}
