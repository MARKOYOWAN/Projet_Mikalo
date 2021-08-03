import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendingService {

  params: any;
  headers = new HttpHeaders();
  model: any;
  url: string;
  _url: string;
  result: any;

  constructor(
    protected http: HttpClient,
  ) {

    this.params = { 'key': 'id' };
    this.headers.set('Accept', 'application/json');
    this.headers.set('Origin', '*');
    this._url = environment.server_url;
  }
  resolve: Promise<[]>;

  get_request(): Promise<any> {
    let url: string = this._url + this.url;
    const params = this.params;
    const headers = this.headers;
    return new Promise((resolve) => {
      this.http.get(url, { params, headers }).subscribe((res) => {

        resolve(res);
      }, async (err) => {
        resolve([])
      });
    })
  }

  update_request() {
    let url = this._url + this.url;
    let formData = new FormData();
    formData.append("data", JSON.stringify(this.model));
    return new Promise((resolve) => {
      this.http.post(url, formData).subscribe((res: any) => {
        if (res.data)
          res = res.data;
        resolve(res);
      }, async (err) => {
        resolve([]);
      });
    });
  }

  post_request(): Promise<any> {
    let url = this._url + this.url;
    return new Promise((resolve, reject) => {
      this.http.post(url, { data: JSON.stringify(this.model) }).subscribe((res: any) => {
        if (res.data)
          res = res.data;
        resolve(res);
      }, async (err) => {
        reject(err)
      });
    });
  }
}
