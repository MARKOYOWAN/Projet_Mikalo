import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { PrepareService } from '../services/rest/prepare.service';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OnLoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private api: PrepareService) {
  }


  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const val = await Storage.get({ key: 'user' }); 
      if (val.value) {
        return true;
      } else {
        this.router.navigate(['/tabs/compte/login']);
        return false;
      }
  }
  
}
