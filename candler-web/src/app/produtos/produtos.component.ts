import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable} from 'angularfire2';

import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos:any[];
  cupons: FirebaseListObservable<any>;
  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtos = this.produtosService.getProdutos();
    this.cupons = this.produtosService.getCupom();
  }

 

}
