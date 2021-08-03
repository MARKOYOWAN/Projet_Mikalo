import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { UserProfil } from 'src/app/models/userprofil';
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: BehaviorSubject<UserProfil> = new BehaviorSubject(null);
  constructor() {

  }

  async setUser(val) {
    const user = new UserProfil(val);
    await Storage.set({
      key: 'user',
      value: JSON.stringify(user)
    });
    this.user.next(user);
  }
  async getUser():Promise<UserProfil> {
    const val = await Storage.get({ key: 'user' });
    let user = JSON.parse(val.value);
    if (user) {    
      this.user.next(user); 
      return user;
    }
    return null;
  }

  async removeClient() {
    await Storage.remove({ key: 'user' });
    this.user.next(null);
  }

  async saveData(_key = 'SETTING', value: any){
    await Storage.set({
      key: _key,
      value: JSON.stringify(value)
    });
  }

  async getSetting(_MODULE: string): Promise<boolean>{
    let val = await Storage.get({ key: 'SETTING' });
    return JSON.parse(val.value) ? JSON.parse(val.value).includes(_MODULE) : false;
  }

}
