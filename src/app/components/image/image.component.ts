import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() image: string;
  _onLoad:boolean = true;

  constructor() { }

  ngOnInit() {}

  onLoad() {
    this._onLoad = false;
  }
  onError() {
    this._onLoad = true;
  }

}
