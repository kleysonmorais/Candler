import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, App } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { PagesRegisterPage } from '../pages-register/pages-register';
import { ResetpwdPage } from '../resetpwd/resetpwd';
import { PagesLoginAuthService } from '../../providers/pages-login-auth-service';
//import { ProgressoPage } from '../progresso/progresso';
import { TabsPage } from '../tabs/tabs';
//import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  //https://github.com/driftyco/ionic/issues/9589
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  zone: NgZone;

  constructor(public navCtrl: NavController, public appCtrl: App, public authService: PagesLoginAuthService, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    console.log("Página de login");
    this.zone = new NgZone({});
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  register() {
    //console.log("Chamando Registro");
    //this.navCtrl.push(PagesRegisterPage);
    /*this.zone.run(() => {
      this.navCtrl.push(PagesRegisterPage);
    });*/
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.navCtrl.push(PagesRegisterPage);
          unsubscribe();
        }else{
          alert("Algum erro ocorreu, tente novamente");
        }
      });
    });
  }

  resetPwd() {
    //this.navCtrl.push(ResetpwdPage);
    /*this.zone.run(() => {
      this.navCtrl.push(ResetpwdPage);
    });*/
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.navCtrl.push(ResetpwdPage);
          unsubscribe();
        }else{
          alert("Algum erro ocorreu, tente novamente");
        }
      });
    });
  }

  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then(authService => {

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          this.zone.run(() => {
            if (user) {
              //this.navCtrl.setRoot(TabsPage);
              this.appCtrl.getRootNav().setRoot(TabsPage);
              unsubscribe();
            } else {
              console.log("Usuário não Logado! login.ts");
            }
          });
        });

      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          console.log("Erro");
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
