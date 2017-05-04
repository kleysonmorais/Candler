import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import { ProgressoPage } from '../progresso/progresso';
import { PagesLoginAuthService } from '../../providers/pages-login-auth-service';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the PagesRegister page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pages-register',
  templateUrl: 'pages-register.html'
})
export class PagesRegisterPage {

  public registerForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  zone: NgZone;

  constructor(public navCtrl: NavController, public authService: PagesLoginAuthService, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      fullname: ['', Validators.compose([ Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    this.zone = new NgZone({});
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.fullname).then( authService => {
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
        console.log("Criado com Sucesso");
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
