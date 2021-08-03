import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { commande } from 'src/app/models/commande';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {
  shop_data: Array<commande>
  nb_cmd = 0;
  constructor(private router: Router,
    private translateConfigService: TranslateConfigService,
    private api: PrepareService,
    private storage: StorageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.storage.getUser().then(res => {
      if (res) {
        console.log(res)
        this.Commande(res.id_customer)
      }
    })
  }

  async Commande(id) {
    if (id) {
      const shop = await this.api.getCommande(id);
      this.shop_data = shop.map((cm) => {
        return new commande(cm);
      })
      this.nb_cmd = this.shop_data.length; 
    }

  }

  open(data) {
    if (data) {
      const value = JSON.stringify(data)
      this.router.navigate(['tabs/home/commande/commande-detail', { value: value }])
    }
  }
}
