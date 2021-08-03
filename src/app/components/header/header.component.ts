import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() is_back: boolean = true;
  is_search: boolean = false;
  donne: string;
  constructor(
    private router: Router,
    private browser: InAppBrowserService,
    private nav: NavController,
  ) { }

  ngOnInit() {
  }

  goToHome() {
    this.nav.navigateRoot('tabs')
  }

  openSearch() {
    this.is_search = !this.is_search
  }

  openBasket() { 
    const url = `${environment.site_url}panier?action=show`;
    this.browser.openWithInAppBrowser(url, true);
  }

  search(code, item) {
    if (code != 13)
      return;

    this.is_search = true;
    if (item) {
      const url = `${environment.site_url}recherche?controller=search&s=${item}`;
      this.browser.openWithInAppBrowser(url, true);
    }
  }

  close() {
    this.nav.back
  }

}
