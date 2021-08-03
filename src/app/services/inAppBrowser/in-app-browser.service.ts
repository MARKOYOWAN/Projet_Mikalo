import { Injectable } from '@angular/core';
import { BrowserOpenOptions, Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class InAppBrowserService {

  constructor(
    private storage : StorageService
  ) { }

  async openWithInAppBrowser(url: any, is_keyNeeded: boolean = true) {
    let key: string;
    if(is_keyNeeded){
      try {
        key = (await this.storage.getUser()).key;
      } catch (error) {
        
      }
    }
    
    const options: BrowserOpenOptions = {
      toolbarColor: environment.color,
      url: key ? `${url}?secure_key=${key}` : url,
    };
    await Browser.open(options);
  }
}
