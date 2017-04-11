import { Component, OnInit } from '@angular/core';
//import { QRCodeComponent } from 'ng2-qrcode'
import {QRCodeComponent} from 'angular2-qrcode';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})  
export class QrcodeComponent implements OnInit {

  qr;
  foo;
  constructor() {
    this.qr = "";
   }

  ngOnInit() {
  }

  onKey(event: any) { // without type info
    this.qr = event.target.value;
  }

}
