import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { PrepareService } from '../services/rest/prepare.service';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private router: Router,
    private api: PrepareService) {
  }

  async canActivate(): Promise<boolean> {
    const val = await Storage.get({ key: 'user' }); 
    if (!val.value) {
      return true;
    } else {
      this.router.navigate(['/tabs/compte']);
      return false;
    }
  }
}
