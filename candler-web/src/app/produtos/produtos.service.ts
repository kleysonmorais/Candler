import { Injectable } from '@angular/core';

@Injectable()
export class ProdutosService {

  produtos: any[];
  constructor() {
    this.produtos = [{id:1, nome:"Lote 1", descricao:"Descrição do lote 1"},
            {id:2, nome:"Lote 2", descricao:"Descrição do lote 2"},
            {id:3, nome:"Lote 3", descricao:"Descrição do lote 3"}
    ];
  }

  getProdutos(){
    return this.produtos;
  }

  getProduto(id: number){
    for (let i = 0; i < this.produtos.length; i++) {
        let cont = this.produtos[id];
        if (cont == this.produtos[i]) {
            return cont;
        }
    }
    return null;
  }

}
