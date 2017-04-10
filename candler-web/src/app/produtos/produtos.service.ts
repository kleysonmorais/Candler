import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class ProdutosService {

  produtos: any[];
  cupom: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
    this.produtos = [{ id: 1, nome: "Lote 1", descricao: "Descrição do lote 1" },
    { id: 2, nome: "Lote 2", descricao: "Descrição do lote 2" },
    { id: 3, nome: "Lote 3", descricao: "Descrição do lote 3" }
    ];
    this.cupom = af.database.list("/cupom/empresa");
    //console.log(this.cupom);
  }

  getProdutos() {
    return this.produtos;
  }

  getProduto(id: number) {
    for (let i = 0; i < this.produtos.length; i++) {
      let cont = this.produtos[id];
      if (cont == this.produtos[i]) {
        return cont;
      }
    }
    return null;
  }

  getCupom() {
    return this.cupom;
  }

  adicionarCupom(_empresa, _produto, _desconto) {
    console.log("1");
    if (_empresa && _produto && _desconto) {
        console.log("2");
        this.cupom.push({
        nome: _empresa,
        produto: _produto,
        desconto: _desconto
      });
    }
  }

}
