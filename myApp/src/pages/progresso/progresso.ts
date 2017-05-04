import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import firebase from 'firebase';
import { PagesLoginAuthService } from '../../providers/pages-login-auth-service';

import { CrudCandler } from '../../providers/crud-candler';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-progresso',
  templateUrl: 'progresso.html'
})
export class ProgressoPage {
  //codigoQr:any;
  zone: NgZone;
  constructor(public crudCandler: CrudCandler, public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public authService: PagesLoginAuthService) {
    /*firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        console.log("Não logado");
        navCtrl.setRoot(LoginPage);
        
      }
    });*/
    this.zone = new NgZone({});
  }

  ionViewDidLoad() {
  }

  logout() {
    this.authService.doLogout();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.appCtrl.getRootNav().setRoot(LoginPage);
          unsubscribe();
        } else {
          console.log("Usuário Logado! progresso.ts");
        }
      });
    });
  }

  validarCandler(qrcode){
    this.crudCandler.alterarStatus(qrcode);
  }

  leitorQrCode(){
    BarcodeScanner.scan()
      .then((result) => {
        //this.codigoQr = result.text;
        this.crudCandler.alterarStatus(result.text);
        // alert(
        //   "We got a barcode\n" +
        //   "Result: " + result.text + "\n" +
        //   "Format: " + result.format + "\n" +
        //   "Cancelled: " + result.cancelled
        // )
      })
      .catch((error) => {
        alert(error);
      })
  }
}
