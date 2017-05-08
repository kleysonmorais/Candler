import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Injectable()
export class CrudCandler {

  banco;
  disponibilidade = false;
  candlers: FirebaseListObservable<any>;

  constructor(public alertCtrl: AlertController, public http: Http, public af: AngularFire) {
  }

  alertas(titulo, mensagem){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }

  getCandlers() {
    return this.candlers;
  }

  resgatarCandler(id: string) {
    console.log("Resgatar Candler");
    var tamanho = id.length;
    var id_lote = id.substring(0, tamanho - 1);
    //console.log("IdLote: " + id_lote);
    // var id_candler = id.substring(tamanho - 1, tamanho);
    //console.log("IdCandler: " + id_candler);
    this.verificarDisponibilidade(id_lote, id);
  }

  verificarDisponibilidade(id_lote, id_candler) {
    console.log("Verificando Disponibilidade");

    var ref = firebase.database().ref("lote_candler/" + id_lote + "/candler/");
    var self = this;
    ref.once("value").then(function (snapshot) {
      var existencia = snapshot.child(id_candler).exists();
      if (existencia) {
        console.log("CANDLER Existe");
        var usado = snapshot.child(id_candler).numChildren();
        if(usado == 1){
          self.alterarStatus(id_lote, id_candler);
        }else{
          self.alertas("Inválido", "Este candler já foi usado");
          console.log("Este Candler já foi usado!");
        }
      } else {
        self.alertas("Inválido", "Este candler não existe");
        console.log("CANDLER Não Existe");
      }
    });

    /*var item;
    var status;
    item = this.af.database.object("lote_candler/" + id_lote + "/candler/" + id_candler, { preserveSnapshot: true });
    item.subscribe(snapshot => {
      status = snapshot.val().status;
      if (status == 'Disponivel') {
        //console.log("Candler Disponível");
        this.alterarStatus(id_lote, id_candler);
        this.disponibilidade = true;
      } else if (!this.disponibilidade) console.log("Candler Indisponível");
    });*/
  }

  alterarStatus(id_lote, id_candler) {
    console.log("Alterando status");
    var uid;
    this.af.auth.subscribe(auth => {
      if (auth) {
        uid = auth.uid;
        this.banco = firebase.database().ref('/lote_candler/' + id_lote + "/candler");
        var atualizar = this.banco.child(id_candler);
        atualizar.set({
          "status": false,
          "id_cliente": uid
        });
        this.verificarId(id_lote, id_candler, uid);
      }
    })
  }

  verificarId(id_lote, id_candler, uid) {
    console.log("Verificando Id");
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

  resgatarInformacoes(id_lote, uid) {
    console.log("Resgantando informações");

    /*var item = this.af.database.object("cliente/" + uid + "/candler/", { preserveSnapshot: true });
    item.subscribe(snapshot => {
      var id_candler = snapshot.child(uid + id_lote).exists();
      if (id_candler) {
        console.log("Existe ");
        this.atualizarCandler(uid, id_lote);
      } else {
        console.log("Não Existe");
        this.criarNovoCandler(uid, id_lote);
      }
    });*/

    var ref = firebase.database().ref("cliente/" + uid + "/candler/");
    var self = this;
    ref.once("value").then(function (snapshot) {
      var id_candler = snapshot.child(uid + id_lote).exists();
      if (id_candler) {
        console.log("Existe ");
        //this.atualizarCandler(uid, id_lote);
        self.atualizarCandler(uid, id_lote);
      } else {
        console.log("Não Existe");
        //this.criarNovoCandler(uid, id_lote);         
        self.criarNovoCandler(uid, id_lote);
      }
    });

    /*var existe = false;
    this.af.auth.subscribe(auth => {
      if (auth) {
        uid = auth.uid;
        this.af.database.list("cliente/" + uid + "/candler", { preserveSnapshot: true })
          .subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              console.log(snapshot.key);
              var id_candler = uid + id_lote + "";
              if ((snapshot.key == id_candler) || existe) {
                //Candler já existe
                this.atualizarCandler(uid, id_lote);
                existe = true;
                return;
              }
            });
            if (!existe) this.criarNovoCandler(uid, id_lote);
          });
      }
    });*/
  }

  atualizarCandler(uid, id_lote) {
    console.log("Atualizando Candler");
    //Recuperar pontuação atual

    /*var databaseRef = firebase.database().ref('cliente').child(uid).child(uid + id_lote).child('pontuacao_atual');
    databaseRef.transaction(function (pontuacao_atual) {
      if (pontuacao_atual) {
        pontuacao_atual = pontuacao_atual + 1;
      }
      return pontuacao_atual;
    });*/

    var upvotesRef = firebase.database().ref("cliente/" + uid + "/candler/" + uid + id_lote + "/pontuacao_atual");
    upvotesRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });

    //var pontuacao_atual;
    //var item;
    /*item = this.af.database.object('cliente/' + uid + "/candler/" + uid + id_lote, { preserveSnapshot: true });
    item.subscribe(snapshot => {
      pontuacao_atual = snapshot.val().pontuacao_atual;
      console.log("Pontuação Atual: " + pontuacao_atual);
      pontuacao_atual++;
      console.log("Pontuação Atualizada: " + pontuacao_atual);
      //Atualizar Pontuação
      this.banco = firebase.database().ref('cliente/' + uid + "/candler/" + uid + id_lote);
      this.banco.update({
        "pontuacao_atual": pontuacao_atual
      });
    });*/
  }

  criarNovoCandler(uid, id_lote) {
    console.log("Criando Candler");
    var item;
    item = this.af.database.object("lote_candler/" + id_lote + "/info_lote", { preserveSnapshot: true });
    item.subscribe(snapshot => {
      this.banco = firebase.database().ref('cliente/' + uid + "/candler/" + uid + id_lote);
      this.banco.update({
        "nome": snapshot.val().nome,
        "descricao": snapshot.val().descricao,
        "status": snapshot.val().status,
        "id_empresa_mae": snapshot.val().id_empresa_mae,
        "quantidade_troca": snapshot.val().quantidade_troca,
        "pontuacao_atual": 1
      });
    });
  }
}
