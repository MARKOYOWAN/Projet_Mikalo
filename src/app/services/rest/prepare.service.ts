import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendingService } from './sending.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { OnesignalService } from '../onesignal/onesignal.service';
@Injectable({
  providedIn: 'root'
})
export class PrepareService extends SendingService {
  public connected: boolean = false;
  constructor(
    protected http: HttpClient,
    private storage: StorageService,
    private onesignal: OnesignalService
  ) {
    super(http);
  }

  async getHome() {
    this.url = "page/home";
    return await this.get_request();
  }

  async getMenu() {
    this.url = "menus";
    return await this.get_request();
  }

  async getEvent() {
    const id_player = this.onesignal.id_player.value
    this.url = `page/events/${id_player}`;
    return await this.get_request();
  }

  async geShop() {
    this.url = "page/shop";
    return await this.get_request();
  }


  async geOffre() {
    this.url = "page/offer";
    return await this.get_request();
  }

  async getService() {
    this.url = "page/service";
    return await this.get_request();
  }

  async getForms() {
    this.url = "form";
    return await this.get_request();
  }

  async getUpdateForms() { 
    const id = this.storage.user.value.id_customer; 
    this.url = `user/profil/${id}`;
    return await this.get_request();
  }

  async postCustomer(form: any, card: string = null) {
    form = {
      id_player: this.onesignal.id_player.value,
      ...form
    }
    if(card){
      form = {
        ...form,
        num_card: card
      }
    }
    this.url = "registration";
    this.model = JSON.parse(JSON.stringify(form));
    return await this.post_request();
  }

  async getReseaux() {
    this.url = "sociale-network";
    return await this.get_request();
  }

  async getNotif() {
    this.url = "notification";
    return await this.get_request();
  }

  async login(form) {
    form = {
      id_player: this.onesignal.id_player.value,
      ...form
    };
    this.url = "login";
    this.model = JSON.parse(JSON.stringify(form));
    return await this.post_request();
  }

  async restPwd(data) {
    this.url = "resetpassword";
    this.model = JSON.parse(JSON.stringify(data));
    return await this.post_request();
  }

  async getCommande(id) {
    this.url = `ordered/${id}`;
    return await this.get_request();
  }

  async evenement(data) {
    data = {
      id_player: this.onesignal.id_player.value,
      ...data
    }
    this.url = "events/participe";
    this.model = JSON.parse(JSON.stringify(data));
    return await this.post_request();
  }

  async updateCompte(data) {
    const id = this.storage.user.value.id_customer
    this.url = `users/update/${id}`;
    this.model = JSON.parse(JSON.stringify(data));
    return await this.post_request();
  }

  async getUser() {
    try {
      const id = (await this.storage.getUser()).id_customer
      this.url = `user/${id}`;
      return await this.get_request();
    } catch (error) {
      return;
    }
    
  }

  async device(data) {
    this.url = "devices";
    this.model = JSON.parse(JSON.stringify(data));
    return await this.post_request();
  }

  async delete_evet(data) {
    this.url = "events/delete/participe";
    this.model = JSON.parse(JSON.stringify(data));
    return await this.post_request();
  }

  async getDetailNotif(id) {
    this.url = `page/notification/${id}`;
    return await this.get_request();
  }

  async getDetailCommande(ref) {
    this.url = `orderedCommande/${ref}`;
    return await this.get_request();
  }

  async getGiftCard() {
    this.url = `gift-card`;
    return await this.get_request();
  }

  async searchDigitCard(value: string) {
    this.url = `search/digit-card/${value}`;
    return await this.get_request();
  }

  uploadMedia(id, media: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
      let fd = new FormData();
      fd.append("media", media);
      fd.append("folder", "devices");
      this.url = `${environment.server_url}users/update-picture/${id}`;
      this.http.post(this.url, fd
      )
        .subscribe((response: string) => {
          resolve(response);
        }, reject);
    });
  }

  async carteDigitale(card: string) {
    const id = this.storage.user.value.id_customer
    this.url = "join/digit-card";
    this.model = JSON.parse(JSON.stringify({
      id_customer: id,
      num_card: card
    }));
    return await this.post_request();
  }


  async getBrands() {
    this.url = "brands";
    return await this.get_request();
  }
}
