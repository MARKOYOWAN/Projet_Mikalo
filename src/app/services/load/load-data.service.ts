import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateConfigService } from '../translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader: any; 
  constructor(
    public loadingController: LoadingController,
    private translateConfigService: TranslateConfigService
  ) {

  }

  async show(message: string = 'WAIT') {
    this.loader = await this.loadingController.create({
      mode: 'ios',
      message: this.translateConfigService.translate(message),
    })
    this.loader.present();
  }

  hide() {
    this.loader.dismiss();
  }

}
