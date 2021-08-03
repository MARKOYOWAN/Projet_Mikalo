import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IonSearchbar } from '@ionic/angular';
import { InAppBrowserService } from 'src/app/services/inAppBrowser/in-app-browser.service';
import { LoaderService } from 'src/app/services/load/load-data.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

export interface rattachCardOption {
  choice: boolean,
  found: boolean,
}

@Component({
  selector: 'ratach-digit-card',
  templateUrl: './ratach-digit-card.component.html',
  styleUrls: ['./ratach-digit-card.component.scss'],
})

export class RatachDigitCardComponent implements OnInit, OnChanges {

  @Input() option : rattachCardOption;
  @Output() result: EventEmitter<any> = new EventEmitter()
  @Output() onChange: EventEmitter<boolean> = new EventEmitter()
  @Output() onReset: EventEmitter<boolean> = new EventEmitter()
  @ViewChild('searchdigit', {static: false}) searchdigit: IonSearchbar;
  is_active: boolean = true;
  hasCard: FormControl
  cardNumber: string; 
  isHasCard: boolean = false;
  myModule: boolean = false;
  
  constructor(
    private _api : PrepareService,
    private storage : StorageService,
    private browser: InAppBrowserService,
    private spin: LoaderService,
    private translateConfigService: TranslateConfigService,
  ) { }

  async ngOnInit() {
    this.myModule = await this.storage.getSetting('DIGIT_CARD');
    this.hasCard = new FormControl(this.option.choice? 0 : 1,[Validators.required]);
    this.focusSearch() 
  }

  private focusSearch(){
    try {
      this.searchdigit.ionFocus
    } catch (error) {
      setTimeout(() => {
        this.focusSearch()
      },100)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let value : rattachCardOption = changes.option.currentValue;
    if(!value.found){
      try {
        this.searchdigit.value = ''
      } catch (error) {}
    }

  }

  onHasCardChange($ev: any){
    const val = $ev.detail.value
    this.onChange.emit(Boolean(val))
  }

  async search($event: KeyboardEvent, item: string) {
    if($event.keyCode == 13){
      this.spin.show();
      const user = await this._api.searchDigitCard(item);
      this.spin.hide();
      try {
        user.firstname = user.name.split(" ")[0];
        user.lastname =  user.name.split(" ")[1];
        delete user.name; 
        this.result.emit({...user, card: item});
        this.cardNumber = item;
      } catch (error) {
        this.result.emit(null)
      }
    }
    
  }

  async validate(item: string){
    if(!item)
      return;
    this.spin.show();
    const user = await this._api.searchDigitCard(item);
    this.spin.hide();
    try {
      user.firstname = user.name.split(" ")[0];
      user.lastname =  user.name.split(" ")[1];
      delete user.name; 
      this.result.emit({...user, card: item});
      this.cardNumber = item;
    } catch (error) {
      this.result.emit(null)
    }
  }

  reset(){
    this.onReset.emit(true)
  }

  commander() {
    const url = this.translateConfigService.translate('LIEN_CARTE');
    this.browser.openWithInAppBrowser(url, true)

  }

}
