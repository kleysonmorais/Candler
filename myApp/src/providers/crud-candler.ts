import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class CrudCandler {

  banco;
  disponibilidade = false;
  candlers: FirebaseListObservable<any>;

  constructor(public http: Http, public af: AngularFire) {
    //console.log('Hello CrudCandler Provider');
    var uid;
    this.af.auth.subscribe(auth => {
      if (auth) {
        uid = auth.uid;
        //console.log("cliente/" + uid + "/candler");
        this.candlers = this.af.database.list("cliente/" + uid + "/candler");
      }
    })
  }

  getCandlers(){
    return this.candlers;
  }

  resgatarCandler(id: string) {
    var tamanho = id.length;
    var id_lote = id.substring(0, tamanho - 1);
    //console.log("IdLote: " + id_lote);
    var id_candler = id.substring(tamanho - 1, tamanho);
    //console.log("IdCandler: " + id_candler);
    this.verificarDisponibilidade(id_lote, id);
  }

  verificarDisponibilidade(id_lote, id_candler) {
    var item;
    var status;
    item = this.af.database.object("lote_candler/" + id_lote + "/candler/" + id_candler, { preserveSnapshot: true });
    item.subscribe(snapshot => {
      status = snapshot.val().status;
      if (status == 'Disponivel') {
        //console.log("Candler Disponível");
        this.alterarStatus(id_lote, id_candler);
        this.disponibilidade = true;
      } else if (!this.disponibilidade) console.log("Candler Indisponível");
    });
  }

  alterarStatus(id_lote, id_candler) {
    var uid;
    this.af.auth.subscribe(auth => {
      if (auth) {
        uid = auth.uid;
        this.banco = firebase.database().ref('/lote_candler/' + id_lote + "/candler");
        var atualizar = this.banco.child(id_candler);
        atualizar.set({
          "status": "Indisponível",
          "id_cliente": uid
        });
        this.verificarId(id_lote, id_candler, uid);
      }
    })
  }

  verificarId(id_lote, id_candler, uid) {
    var item;
    var id_cli;
    item = this.af.database.object("lote_candler/" + id_lote + "/candler/" + id_candler, { preserveSnapshot: true });
    item.subscribe(snapshot => {
      id_cli = snapshot.val().id_cliente;
      if (id_cli == uid) {
        this.resgatarInformacoes(id_lote, uid);
      } else if (!this.disponibilidade) console.log("Permissão Negada!");
    });
  }

  resgatarInformacoes(id_lote, uid){
    var item;
    //console.log("lote_candler/" + id_lote + "/candler/info_lote");
    item = this.af.database.object("lote_candler/" + id_lote + "/info_lote", { preserveSnapshot: true });
    item.subscribe(snapshot => {
        //console.log("Nome: " + snapshot.val().nome);
        //console.log("Descrição: " + snapshot.val().descricao);
        //console.log("Pontuação: " + snapshot.val().pontuacao);
        //console.log('/cliente/' + uid + "/candler/" + uid + id_lote);
        this.banco = firebase.database().ref('/cliente/' + uid + "/candler/" + uid + id_lote);
        this.banco.set({
          "nome": snapshot.val().nome,
          "descricao": snapshot.val().descricao,
          "status": snapshot.val().status,
          "id_empresa_mae": snapshot.val().id_empresa_mae
        });
    });
  }

}
