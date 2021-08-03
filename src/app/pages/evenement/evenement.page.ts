import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evenenement } from 'src/app/models/event';
import { OnesignalService } from 'src/app/services/onesignal/onesignal.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';

@Component({
  selector: 'page-evenement',
  templateUrl: './evenement.page.html',
  styleUrls: ['./evenement.page.scss'],
})
export class EvenementPage implements OnInit {

  evenements: Array<Evenenement> = [];
  private promises: Array<any> = [];
  ready: boolean = false
  constructor(
    private api: PrepareService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const data = this.loadEvent();
    this.promises.push(data);
  }

  ionViewDidEnter() {
    Promise.all(this.promises).then(() => {
      this.activatedRoute.params.subscribe(params => {
        if (params.id)
          this.scrollTo(params.id)
      })
    })
  }

  async loadEvent() {
    this.ready = false
    this.evenements = await this.api.getEvent();
    this.ready = true
  }

  scrollTo(id) {
    try {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
    } catch (error) {
      setTimeout(_ => {
        this.scrollTo(id)
      }, 100)
    }
  }

  

}
