import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { ProdutosService } from '../produtos/produtos.service';
import { cupom } from '../services/model/cupom';


@Component({
  selector: 'app-comprar-produto',
  templateUrl: './comprar-produto.component.html',
  styleUrls: ['./comprar-produto.component.css']
})
export class ComprarProdutoComponent implements OnInit {

  inscricao: any;
  id: number;
  ///cupom_aux: any;

  cup: FirebaseObjectObservable<any>;

  constructor(private route: ActivatedRoute, private produtosService: ProdutosService, public cupom_aux: cupom) {}

  ngOnInit() {
    //Recebe o Id da url e chama função para atualizar dados desta view
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.produtosService.resgatarCupom(this.id);
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
