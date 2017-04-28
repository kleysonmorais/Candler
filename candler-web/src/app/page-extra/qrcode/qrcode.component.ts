import { Component, OnInit, OnDestroy } from '@angular/core';
//import { QRCodeComponent } from 'ng2-qrcode'
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { QRCodeComponent } from 'angular2-qrcode';

import { candler } from './../../services/model/candler';
import { CrudCandlerService } from './../../services/crud-candler.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit, OnDestroy {

  qr;
  foo;
  inscricao: any;
  id: any;
  candlers: FirebaseListObservable<any>;
  teste: FirebaseListObservable<any>;

  constructor(public af: AngularFire, private route: ActivatedRoute, public candlerService: CrudCandlerService) {
    this.qr = "";
    this.candlerService.emitirListaCandlers.subscribe(status => {
      if (status) {
        this.candlers = this.candlerService.getCandlers();
      }
    });
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.qr = this.id;
        //this.candlers = this.af.database.list("lote_candler/" + this.id + "/candler");
        this.candlerService.recuperarCandlers(this.id);
      }
    );

  }

  onKey(event: any) { // without type info
    this.qr = event.target.value;
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
