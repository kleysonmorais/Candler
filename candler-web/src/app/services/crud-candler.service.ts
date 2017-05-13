import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { CrudEmpresaService } from './crud-empresa.service';
import { empresa } from './model/empresa';

@Injectable()
export class CrudCandlerService {

  candlers: FirebaseListObservable<any>;
  lote_candler: FirebaseListObservable<any>;
  emitirListaMeuEspaco = new EventEmitter<boolean>();
  emitirListaCandlers = new EventEmitter<boolean>();

  constructor(public af: AngularFire, private router: Router, public empresa: empresa, public crud: CrudEmpresaService) {
    //empresa = crud.getEmpresa();
    this.empresa = this.crud.getEmpresa();
    //console.log("Id Empresa: " + this.empresa.getId());
    this.crud.emitirLogin.subscribe(
      status => {
        if (status) {
          this.empresa = this.crud.getEmpresa();
          //console.log("Id Empresa constructor: " + this.empresa.getId());
          this.lote_candler = this.af.database.list("empresa/" + this.empresa.getId() + "/lote_filho");
          console.log("Emitiu lista meu espaço");
          this.emitirListaMeuEspaco.emit(true);
        }
      }
    );
  }

  recuperarCandlers(id_candler) {
    var lista;
    console.log("lote_candler/" + id_candler + "/candler");
    this.candlers = this.af.database.list("lote_candler/" + id_candler + "/candler");
    /*lista.subscribe(items => items.forEach(item => {
      console.log("Id: Candler " + item.status);
    }));*/
    this.emitirListaCandlers.emit(true);
  }

  getCandlers() {
    return this.candlers;
  }

  getLotes() {
    console.log("Id Empresa getLotes: " + this.empresa.getId());
    return this.lote_candler;
  }


}
