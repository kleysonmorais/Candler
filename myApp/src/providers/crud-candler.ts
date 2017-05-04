import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class CrudCandler {

  banco;

  constructor(public http: Http) {
    console.log('Hello CrudCandler Provider');

  }

  alterarStatus(id: string) {
    var tamanho = id.length;
    var id_lote = id.substring(0, tamanho - 1);
    console.log("IdLote: " + id_lote);
    var id_candler = id.substring(tamanho - 1, tamanho);
    console.log("IdCandler: " + id_candler);
    this.banco = firebase.database().ref('/lote_candler/' + id_lote + "/candler");
    var atualizar = this.banco.child(id);
    atualizar.set({
      "status": "Indisponível"
    });

  }

}
