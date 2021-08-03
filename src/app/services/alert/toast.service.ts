import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateConfigService } from '../translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message: string;
  color: 'success' | 'danger' | 'warning' | 'dark' | 'light'
  position: 'top' | 'bottom' | 'middle' = 'top';

  constructor(
    public toastCtrl: ToastController,
    private _translate : TranslateConfigService
  ) { }

  async AlertMessage() {
    const toast = await this.toastCtrl.create({
      message: this._translate.translate(this.message),
      duration: 2500,
      mode: 'ios',
      position: this.position,
      color: this.color,
    });
    toast.present();
  }
}
