import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable} from 'angularfire2';

import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  cupons: FirebaseListObservable<any>;
  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    //Atualiza lista com os cupons
    this.cupons = this.produtosService.getCupom();
  }

 

}
