import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { commande } from 'src/app/models/commande';
import { PrepareService } from 'src/app/services/rest/prepare.service';

@Component({
  selector: 'app-commande-detail',
  templateUrl: './commande-detail.page.html',
  styleUrls: ['./commande-detail.page.scss'],
})
export class CommandeDetailPage implements OnInit {
  value: any;
  val: any
  shop_data: Array<commande>
  ready: boolean = false
  constructor(private activatedRoute: ActivatedRoute,
    private api: PrepareService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.val = this.activatedRoute.snapshot.paramMap.get("value");
    this.value = JSON.parse(this.val); 
    this.getDatail(this.value)
  }

  async getDatail(reference) {
    if (reference) {
      const detail = await this.api.getDetailCommande(reference);
        this.shop_data = detail.map((cm) => {
          return new commande(cm);
        })
        if( this.shop_data.length > 0 ) { 
          this.ready = true;
        } else {
          this.ready = false;
        }
    }
  }

  ngOnDestoy() {
    this.val
  }

}
