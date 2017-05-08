import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import firebase from 'firebase';
import { PagesLoginAuthService } from '../../providers/pages-login-auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CrudCandler } from '../../providers/crud-candler';
//import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
//import { ProgressBarComponent } from '../../components/progress-bar/progress-bar'


@Component({
  selector: 'page-progresso',
  templateUrl: 'progresso.html'
})
export class ProgressoPage {
  //codigoQr:any;
  zone: NgZone;

  candlers: FirebaseListObservable<any>;
  progressoBar;

  constructor(public af:AngularFire, public crudCandler: CrudCandler, public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public authService: PagesLoginAuthService) {
    var uid;
    this.af.auth.subscribe(auth => {
      if (auth) {
        uid = auth.uid;
        //console.log("cliente/" + uid + "/candler");
        this.candlers = this.af.database.list("cliente/" + uid + "/candler");
      }
    })
    this.zone = new NgZone({});
    this.progressoBar = 10;
  }

  ionViewDidLoad() {
  }


  logout() {
    this.authService.doLogout();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          //this.appCtrl.getRootNav().setRoot(LoginPage);
          this.appCtrl.getRootNav().setRoot(HomePage);
          unsubscribe();
        } else {
          console.log("Usuário Logado! progresso.ts");
        }
      });
    });
  }

  validarCandler(qrcode){
    this.crudCandler.resgatarCandler(qrcode);
  }

  leitorQrCode(){
    BarcodeScanner.scan()
      .then((result) => {
        //this.codigoQr = result.text;
        this.crudCandler.resgatarCandler(result.text);
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
