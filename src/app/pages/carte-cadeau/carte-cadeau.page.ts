import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';

@Component({
  selector: 'app-carte-cadeau',
  templateUrl: './carte-cadeau.page.html',
  styleUrls: ['./carte-cadeau.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarteCadeauPage implements OnInit {

  href: string;
  html : SafeHtml;
  ready : boolean = false;
  constructor(
    private _iab : InAppBrowserService,
    private _api: PrepareService,
    private _sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){  
    const html = await this._api.getGiftCard();  
    this.html = this._sanitizer.bypassSecurityTrustHtml(html.content);    
    this.customStyle();
    this.ready = true;
  }

  private async customStyle(){
    try {
      //REMOVE ALL HREF
      const value = document.getElementsByClassName("add-to-cart");
      const href = value[0].getAttribute('href');
      value[0].remove();
      this.href = href;
      await document.querySelectorAll('a').forEach((a) => {
        a.removeAttribute("href")
      });
    } catch (error) {
      setTimeout(() => {
        this.customStyle();
      },100)      
      
    }
  }

  open(){
    this._iab.openWithInAppBrowser(this.href)
  }

}
