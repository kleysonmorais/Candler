import { FirebaseListObservable } from 'angularfire2';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { CrudCandlerService } from './../../services/crud-candler.service';

@Component({
  selector: 'app-meu-espaco',
  templateUrl: './meu-espaco.component.html',
  styleUrls: ['./meu-espaco.component.css']
})
export class MeuEspacoComponent implements OnInit, OnDestroy, OnChanges {

  //candlers: FirebaseListObservable<any>;
  lote_candler: FirebaseListObservable<any>;
  //candlers: candler[] = new Array;

  constructor(public crudCandler: CrudCandlerService) {
    //this.candlers = crudCandler.getCandlers();
    console.log("MeuEspaco");
    this.lote_candler = crudCandler.getLotes();
    this.crudCandler.emitirListaMeuEspaco.subscribe(status => {
      if (status) {
        this.lote_candler = crudCandler.getLotes();
        /*this.lote_candler.subscribe(items => items.forEach(item => {
          console.log("Id: Candler" + item.$key);
          this.candlers.push(new candler(item.$key, "qrcode", item.status));
        }));*/
      }
    });
    //console.log(this.lote_candler);
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }

  ngOnChanges() {
    console.log("ngOnChanges");
  }

}
