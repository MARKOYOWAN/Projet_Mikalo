import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.component.html',
  styleUrls: ['./refresher.component.scss'],
})
export class RefresherComponent implements OnInit { 
  @Output() onRefresh: EventEmitter<any> = new EventEmitter()
  constructor(
    private lang: TranslateConfigService
  ) { }

  ngOnInit() { 
  }

  async doRefresh(event) {
    if(event) { 
      event.target.complete();
      this.onRefresh.emit(null); 
      this.lang.hydrate()
    }
  }
}
