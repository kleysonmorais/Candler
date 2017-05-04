import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import { PagesRegisterPage } from '../pages-register/pages-register';
import { PagesLoginAuthService } from  '../../providers/pages-login-auth-service';
//import { ProgressoPage } from '../progresso/progresso';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Resetpwd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html'
})
export class ResetpwdPage {

  public resetpwdForm;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  zone: NgZone;

  constructor(public navCtrl: NavController, public authService: PagesLoginAuthService, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.resetpwdForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
    });
    this.zone = new NgZone({});
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  resetPwd() {
    if (!this.resetpwdForm.valid){
      console.log(this.resetpwdForm.value);
    } else {
      this.authService.resetPassword(this.resetpwdForm.value.email).then( authService => {
        //this.navCtrl.setRoot(ProgressoPage);
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          this.zone.run(() => {
            if (user) {
              this.navCtrl.setRoot(TabsPage);
              unsubscribe();
            } else {
              console.log("Usuário não Logado! login.ts");
            }
          });
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
