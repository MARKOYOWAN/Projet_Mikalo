import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal, OSNotification, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment';
import { OperatingSystem, Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateConfigService } from '../translate-config.service';

const { Device } = Plugins


@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  private _OS: OperatingSystem;
  id_player: BehaviorSubject<string> = new BehaviorSubject(null); 

  constructor(
    private oneSignal: OneSignal,
    private router: Router,
    private _translation: TranslateConfigService
  ) { }

  async init() {
    this.oneSignal.startInit(environment.onesignal.app_id, environment.onesignal.project_id);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationReceived().subscribe((res: OSNotification) => {
      // do something when notification is received
      //let data : OSNotificationPayload = res.payload;
      this._translation.hydrate();
    });

    this.oneSignal.handleNotificationOpened().subscribe((res: OSNotificationOpenedResult) => {
      // do something when a notification is opened
      this.open(res.notification.payload.additionalData);
    });

    this.oneSignal.endInit();

    return await this.getPlayerId();
  }

  async getDevice(): Promise<OperatingSystem> {
    const info = await Device.getInfo();
    this._OS = info.operatingSystem
    return this._OS;
  }

  async getDefaultLang() {
    return await Device.getLanguageCode();
  }

  getPlayerId(): Promise<any> {
    return new Promise(async (resolve) => {
      let id_player = "a11cbdd8-19a4-4643-b106-5fde7e34be16";
      await this.getDevice();
      if (this._OS == 'ios') {
        this.oneSignal.promptForPushNotificationsWithUserResponse().then(async (res) => {
          if (!res)
            this.setSubscription(true);
          id_player = await this._playerid()
          this.id_player.next(id_player)
          resolve(id_player);
        }).catch((err) => {
          this.id_player.next(id_player)
          resolve(id_player);
        })
      } else if(this._OS == 'android' ){
        id_player = await this._playerid()
        this.id_player.next(id_player)
        resolve(id_player);
      } else{
        this.id_player.next(id_player)
        resolve(id_player);
      }
    })
  }

  setSubscription(state: boolean) {
    this.oneSignal.setSubscription(state)
  }

  open(link: string) {
    this.oneSignal.clearOneSignalNotifications();
    this.is_valid_url(link)
    this.router.navigateByUrl(link);
  }

  private async _playerid(): Promise<string> {
    const player = await this.oneSignal.getIds()
    return player['userId']
  }

  private is_valid_url(link: string) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(link);
  }
}
