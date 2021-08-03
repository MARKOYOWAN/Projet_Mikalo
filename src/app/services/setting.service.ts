import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private lien: string = environment.server_url
  
  constructor(
    protected httpClient: HttpClient,
    private _store : StorageService
  ) { }

  all(): Promise<null> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.lien + 'setting').subscribe(async (res: any) => {
        this._store.saveData('SETTING', res);
        resolve(null);
      }, _ => {
        reject()
      })
    })
  }
}
