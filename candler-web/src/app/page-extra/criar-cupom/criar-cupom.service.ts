import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { empresa } from './../../services/model/empresa';

@Injectable()
export class CriarCupomService {

  constructor(public af: AngularFire, private router: Router, public empresa: empresa) { }

  criarCupom(formData) {
    var id_lote = Math.floor(Math.random() * 9999) + 1;
    console.log("ID gerado: " + id_lote);
    this.af.auth.subscribe(auth => {
      //Verifica se empresa está logada
      if (auth) {
        //Id do Lote é a junção do Id da empresa com o Id gerado
        var id: string;
        id = this.empresa.getId() + id_lote;
        console.log("Id: " + this.empresa.getId());
        this.criarLote(formData, id);
        this.criarCupons(id, 5);
        this.router.navigate(['/home']);
        alert("Cupom criado com sucesso!");
      }
    });
  }

  criarLote(formData, id) {
    //Armazena na empresa
    /*this.af.database.object('empresa/' + this.empresa.getId() + "/mae/lote_ativo/" + id_lote + "/info_lote").set({
      nome: formData.value.nomeCupom,
      descricao: formData.value.descricao,
      valor: "99.99"
    });*/


    this.af.database.object('empresa/' + this.empresa.getId() + "/lote_mae/" + id).set({
      status: "Disponivel"
    });

    //Armazena no grupo de cupons para venda
    /*this.af.database.object('cupom/' + id_lote + '/info_lote').set({
      nome: formData.value.nomeCupom,
      descricao: formData.value.descricao,
      valor: "99.99",
      id_empresa_mae: this.empresa.getId()
    });*/

    this.af.database.object('lote_cupom/' + id + '/info_lote').set({
      id_empresa_mae: this.empresa.getId(),
      nome: formData.value.nomeCupom,
      descricao: formData.value.descricao,
      valor: "99.99",
      status: "Disponivel"
    });


  }

  criarCupons(id_lote, quantidade) {
    for (var i = 0; i < quantidade; i++) {
      this.af.database.object("lote_cupom/" + id_lote + "/cupom/" + id_lote + i).set({
        status: "Disponivel"
      });
    }
  }

}
