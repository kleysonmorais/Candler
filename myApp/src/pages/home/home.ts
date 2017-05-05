import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PagesRegisterPage } from '../pages-register/pages-register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(PagesRegisterPage);
  }

}
