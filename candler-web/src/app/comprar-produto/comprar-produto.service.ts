import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { empresa } from './../services/model/empresa';

@Injectable()
export class ComprarProdutoService {

  constructor(public af: AngularFire, private router: Router, public empresa: empresa) { }

  criarCandler(formData, quantidade, empresa_mae_id) {
    var id_lote = Math.floor(Math.random() * 9999) + 1;
    console.log("ID gerado: " + id_lote);
    this.af.auth.subscribe(auth => {
      //Verifica se empresa está logada
      if (auth) {
        //Id do Lote é a junção do Id da empresa com o Id gerado
        var id: string;
        id = this.empresa.getId() + id_lote;
        console.log("Id: " + this.empresa.getId());
        this.comprarLote(formData, id, empresa_mae_id);
        this.criarCandlers(id, quantidade);
        this.router.navigate(['/home']);
        alert("Candlers criados com sucesso!");
      }
    });
  }

  comprarLote(formData, id, empresa_mae_id: string) {
   this.af.database.object('empresa/' + this.empresa.getId() + "/lote_filho/" + id).set({
      /*id_empresa_mae: this.empresa.getId(),
      nome: formData.value.nomeCandler,
      descricao: formData.value.descricao,
      valor: "99.98",*///
      status: true
    });

    var empresa_mae = empresa_mae_id.substring(0, 28);
    //console.log("Empresa mãe: " + empresa_mae);
    this.af.database.object('lote_candler/' + id + '/info_lote').set({
      id_empresa_filha: this.empresa.getId(),
      id_lote_mae: empresa_mae_id,
      id_empresa_mae: empresa_mae,
      nome: formData.value.nomeCandler,
      descricao: formData.value.descricao,
      valor: "99.99",
      quantidade_troca: "10",
      status: true
    });
  }

  criarCandlers(id_lote, quantidade) {
    for (var i = 0; i < quantidade; i++) {
      this.af.database.object("lote_candler/" + id_lote + "/candler/" + id_lote + i).set({
        status: true
      });
    }
  }
}
