import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  protected lang: any;
  private lien: string = environment.server_url
  constructor(
    protected httpClient: HttpClient,
    private translation: TranslateService,
  ) { }

  hydrate(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.lien + 'translation').subscribe(async (res: any) => {
        for (let l of res) {
          if (l)
            this.translation.setTranslation(l.lang, l[l.lang])
        }
        await this.getDefaultLanguage()
        this.setLanguage(this.lang)
        resolve(this.lang);
      }, _ => {
        reject()
      })
    })
  }


  async getDefaultLanguage(): Promise<string> {
    // await this.auth.getLang().then((lang) => {
    //   this.lang = lang
    // },() => {
    //   this.lang = this.translation.getBrowserLang(); 
    // })    
    return 'fr';
  }

  setLanguage(lang: string) {
    if (lang != 'fr' && lang != 'en')
      lang = 'fr';
    this.lang = lang

    this.translation.instant(this.lang)
    this.translation.use(lang);
  }

  getLanguages(): string[] {
    return this.translation.getLangs()
  }

  translate(txt: string): string {
    return this.translation.translations[this.lang][txt]
  }
}
