import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class PagesLoginAuthService {

  public fireAuth: any;
  public userData: any;

  constructor( public http: Http) {
    console.log('Hello PagesLoginAuthService Provider');
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/cliente');
  }

  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, nome: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
        this.userData.child(newUser.uid).set({ info_cliente: {
          email: email,
          nome: nome
        } });
      });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    this.fireAuth.signOut();
  }
}
