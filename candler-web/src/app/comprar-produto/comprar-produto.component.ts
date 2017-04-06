import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProdutosService } from '../produtos/produtos.service';

@Component({
  selector: 'app-comprar-produto',
  templateUrl: './comprar-produto.component.html',
  styleUrls: ['./comprar-produto.component.css']
})
export class ComprarProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private produtosService: ProdutosService) { }

  inscricao: any;
  id:number;
  produto: any;

  ngOnInit() {
      this.inscricao = this.route.params.subscribe(
        (params: any) => {
          this.id = params['id'];
          this.produto = this.produtosService.getProduto(this.id-1);
        }
      )
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
