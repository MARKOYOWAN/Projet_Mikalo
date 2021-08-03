import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { environment } from 'src/environments/environment';

interface marker {
  lat: number;
  lng: number;
  label?: string;
}

@Component({
  selector: 'app-magasin-map',
  templateUrl: './magasin-map.page.html',
  styleUrls: ['./magasin-map.page.scss'],
})
export class MagasinMapPage implements OnInit {
  value: any;
  img: boolean = true;
  ready: boolean = false;
  public mapTypeId: string = "roadmap";
  public zoom: number = environment.map.zoom;
  public lat: number = environment.map.lat;
  public lng: number = environment.map.lng;
  public marker: marker = {
    lat: environment.map.lat,
    lng: environment.map.lng,
  };

  constructor(private activatedRoute: ActivatedRoute,
    public actionCtrl: ActionSheetController,
    private translate: TranslateConfigService) { }
  ngOnInit() {
  }

  ionViewDidEnter() {
    const donne = this.activatedRoute.snapshot.paramMap.get("value");
    if (donne) {
      this.value = JSON.parse(donne)
      this.lat = this.value.latitude;
      this.lng = this.value.longitude;
      this.marker = {
        lat: this.value.latitude,
        lng: this.value.longitude,
      };
      this.ready = true;
    }
  }
  ngOnDestoy() {
    this.value
  }

  onLoad() {
    this.img = false;
  }
  onError() {
    this.img = true;
  }

  async mapOptions() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [
        {
          text: this.translate.translate('MAP_BUTTON_1'),
          handler: () => {
            this.mapTypeId = "satellite";
          },
        },
        {
          text: this.translate.translate('MAP_BUTTON_2'),
          handler: () => {
            this.mapTypeId = "roadmap";
          },
        },
        {
          text: this.translate.translate('MAP_BUTTON_CANCEL'),
          role: 'cancel',
          handler: () => { },
        },
      ],
    });
    await actionSheet.present();
  }
}
