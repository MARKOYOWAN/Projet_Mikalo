import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './models/menu';
import { Sociaux } from './models/reseaux';
import { InAppBrowserService } from './services/inAppBrowser/in-app-browser.service';
import { OnesignalService } from './services/onesignal/onesignal.service';
import { PrepareService } from './services/rest/prepare.service';
import { TranslateConfigService } from './services/translate-config.service';
import { Plugins } from '@capacitor/core';
import { SettingService } from './services/setting.service';
import { StorageService } from './services/storage/storage.service';
import { MenuController, Platform } from '@ionic/angular';
import { UserProfil } from './models/userprofil';
import { LoaderService } from './services/load/load-data.service';

const { Storage, SplashScreen, Network, StatusBar } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  MenuData: Array<Menu>;
  Reseaux: Array<Sociaux>;
  userInfo: UserProfil; 
  socialNetwork: boolean;
  private promises = [];

  constructor(
    private platform: Platform,
    private menu : MenuController,
    private _translation: TranslateConfigService,
    private _setting: SettingService,
    private api: PrepareService,
    private router: Router,
    private browser: InAppBrowserService,
    private onesignale: OnesignalService,
    private storagesrv: StorageService,
    private spin : LoaderService
  ) {
    
  }

  ngOnInit(): void {
    this.initNetwork();
    this.promises.push(this._translation.hydrate());
    this.promises.push(this._setting.all());
    this.initializeApp();
    this.Menu();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.promises.push(this.onesignale.init());
      Promise.all(this.promises).then( async (_) => {
        this.socialNetwork = await this.storagesrv.getSetting('SOCIAL_NETWORK');
        this.Menu();
        this.Sociaux();    
        this.Storage();
        this.StorData(); 
        SplashScreen.hide(); 
      })
    })
  }

  async Menu() {
    const menuData = await this.api.getMenu();
    this.MenuData = menuData.map((of) => {
      return new Menu(of);
    })

  }

  async Go(lien) {
    if (lien) {
      this.router.navigate([lien])
    }
  }

  connexion() {
    this.router.navigate(['tabs/compte/login']);

  }

  private async Sociaux() {
    const reseaux = await this.api.getReseaux();
    this.Reseaux = reseaux.map((of) => {
      return new Sociaux(of);
    })

  }

  Open(url) {
    this.browser.openWithInAppBrowser(url);
  }

  private Storage() {
    Storage.get({ key: 'first_time' }).then(async (value) => {
      if (!value.value) {
        const data = {
          id_player: this.onesignale.id_player.value
        }
        this.api.device(data).then(rs => {
          console.log("ok")
        })
        Storage.set({ key: 'first_time', value: 'true' });
      }
    })
  }

  private StorData() {
    this.api.getUser().then((res) => {
      if(res)
        this.storagesrv.setUser(res)
    })
    this.storagesrv.user.subscribe((res) => {
      if(res)
        this.userInfo = res;
    })
  }

  compte() {
    this.menu.close()
    this.router.navigate(['tabs/compte'])
  }

  initNetwork(){
    Network.getStatus().then(isConnected => {
      if(!isConnected.connected)
        this.spin.show("WAITING_FOR_INTERNET");
    })
    Network.addListener('networkStatusChange', async(status) => {
      if(!status.connected){
        this.spin.show("WAITING_FOR_INTERNET");
      }else{
        await this.spin.hide();
        try {
          this.ngOnInit()
        } catch (error) {
          
        }
        
      }
    });
  }
}
