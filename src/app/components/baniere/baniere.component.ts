import { Component, Input, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';

@Component({
  selector: 'app-baniere',
  templateUrl: './baniere.component.html',
  styleUrls: ['./baniere.component.scss'],
})
export class BaniereComponent implements OnInit {

  @Input() ban: Banner;
  img: boolean = false; 
  constructor() { }

  ngOnInit() {
    this.ban = new Banner(this.ban);   
  }

}
