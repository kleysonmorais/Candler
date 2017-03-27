import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-progresso',
  templateUrl: 'progresso.html'
})
export class ProgressoPage {
  teste: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.teste = af.database.list("/teste");
    console.log(this.teste);
    //console.log(this.teste.nome/);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProgressoPage');
  }

}
