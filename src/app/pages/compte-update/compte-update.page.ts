import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraOptions, CameraSource, } from '@capacitor/core'
import { ActionSheetController } from '@ionic/angular';
// import { cpus } from 'os';
import { ErrorItem, Forme } from 'src/app/models/forme';
import { UserProfil } from 'src/app/models/userprofil';
import { CustomAlertService } from 'src/app/services/alert/custom-alert.service';
import { ToastService } from 'src/app/services/alert/toast.service';
import { LoaderService } from 'src/app/services/load/load-data.service';
import { PrepareService } from 'src/app/services/rest/prepare.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { environment } from 'src/environments/environment';
const { Camera } = Plugins
@Component({
  selector: 'app-compte-update',
  templateUrl: './compte-update.page.html',
  styleUrls: ['./compte-update.page.scss'],
})
export class CompteUpdatePage implements OnInit {
  base64Image: string = null;
  compte: UserProfil
  userprofileForm: FormGroup;
  forms: Array<Forme> = [];
  error: ErrorItem;
  item: any = {};
  is_ready: boolean = false;
  
  constructor(
    private _formBuilder: FormBuilder,
    private translate: TranslateConfigService,
    private actionSheetController: ActionSheetController,
    private storage: StorageService,
    private api: PrepareService,
    private alert: CustomAlertService,
    private toast: ToastService,
    private route: Router,
    public load: LoaderService) { }

  ngOnInit() {
    this.Storage();
    this.loadData();
  }

  async loadData() {
    await this.load.show();
    this.api.getUpdateForms().then(res => {    
      this.userprofileForm = this.creatForm(res);
      this.load.hide();
      this.is_ready = true;
    });
  }

  creatForm(fields: Array<any>): FormGroup {
    let _form = {};
    fields.map((res) => {
      if (res) {
        const _field = new Forme(res);
        this.forms.push(_field);
        if (_field.is_required) {
          if (_field.type === 'password') {
            _form[_field.field] = new FormControl({value: '', disabled: true}, []);
          }else if (_field.type === 'email') {
            _form[_field.field] = new FormControl({value: _field.default_value, disabled: true}, []);          
          } else {
            _form[_field.field] = new FormControl(_field.default_value, [Validators.required, Validators.pattern(_field.pattern)]);
          }
        }
        else { _form[_field.field] = new FormControl(_field.default_value, []); }
      }
    })
    return this._formBuilder.group(_form)
  }

  async initCamera() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.translate('CAMERA_CHOICE'),
      buttons: [
        {
          text: this.translate.translate('CAMERA_GALLERY'),
          icon: 'image-outline',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          },
        },
        {
          text: this.translate.translate('CAMERA_CAMERA'),
          icon: 'camera',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          },
        },
      ],
    });
    await actionSheet.present();
  }


  takePicture(cameraSource: CameraSource) {
    const options: CameraOptions = {
      quality: 90,
      source: cameraSource,
      resultType: CameraResultType.DataUrl,
    };

    Camera.getPhoto(options).then(
      (imgData) => {
        this.load.show();
        this.api.uploadMedia(this.compte.id_customer, this.dataURLtoFile(imgData.dataUrl, "profil-" + Math.random().toString(36).substring(7) + this.compte.id_customer + ".jpg")).then(async result => {
          if (result) {
            this.load.hide();
            this.api.getUser().then((res) => {
              this.storage.setUser(res);
              this.notif_success();
            });
            (document.getElementById('profil') as HTMLImageElement).src = imgData.dataUrl;
            this.notif_success();
          }
        })
      },
      (error) => {
        this.load.hide();
        console.log(error);
      }
    );
  }



  dataURLtoFile(dataurl, filename): File {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  Storage() {
    this.storage.user.subscribe(data => {
      if(data)
        this.compte = data;
    })
    this.storage.getUser().then(data => {
      if(data)
        this.compte = data;
    })
  }

  onSubmit() {
    this.load.show();
    const formValues = this.userprofileForm.value;
    this.forms.forEach((form, index) => {
      const value = formValues[form.field];
      this.forms[index].value = value;
    });
    this.api.updateCompte(this.forms).then(data => {
      if (data) {
        this.load.hide();
        this.storage.setUser(data);
        this.route.navigate(['tabs/compte'])
      } else {
        this.load.hide();
        this.notif_erreur();
      }
    },(onRejected) => {
      this.error = onRejected.error as ErrorItem;
      this.load.hide();
      this.notif_erreur();
    })
  }

  notif_erreur() {
    this.alert.alertConfig = {
      header: 'ERREUR',
      message: 'ERREUR_GLOBAL',
      btn_ok : 'OK',
    };
    this.alert.presentAlert()
  }

  notif_success() {
    this.toast.message = 'MODIF_IMAGE';
    this.toast.color = 'success';
    this.toast.AlertMessage();
  }
}
