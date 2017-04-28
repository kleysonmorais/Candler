import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { cupom } from '../services/model/cupom';

@Injectable()
export class ProdutosService {

  cupons: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, public cupom_aux: cupom) {
    this.cupons = af.database.list("lote_cupom/");
  }

  resgatarCupom(id: number) {
    //Resgata o cupom do id informado
    var item;
    console.log("Resgatando Cupom: " + id);
    item = this.af.database.object("lote_cupom/" + id + "/info_lote/", { preserveSnapshot: true });
    item.subscribe(snapshot => {
      this.cupom_aux.atualizaCupom(snapshot.val().nome, snapshot.val().descricao, snapshot.val().id_empresa_mae, snapshot.val().valor, id);
      console.log("Cupom Atualizado: " + snapshot.val().nome);
    });
  }

  getCupom() {
    //Retorna lista com cupons
    return this.cupons;
  }

  getCupomUnico() {
    //Retorna cupom especifico
    return this.cupom_aux;
  }

  adicionarCupom(_empresa, _produto, _desconto) {
    if (_empresa && _produto && _desconto) {
      this.cupons.push({
        nome: _empresa,
        produto: _produto,
        desconto: _desconto
      });
    }
  }

}
