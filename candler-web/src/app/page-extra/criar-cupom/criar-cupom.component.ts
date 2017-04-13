import { Component, OnInit } from '@angular/core';
import { CriarCupomService } from './criar-cupom.service';

@Component({
  selector: 'app-criar-cupom',
  templateUrl: './criar-cupom.component.html',
  styleUrls: ['./criar-cupom.component.css']
})
export class CriarCupomComponent implements OnInit {

  constructor(public criarCupomService: CriarCupomService) { }

  ngOnInit() {
  }

  criarCupom(formData){
      if(formData.valid){
        console.log("Criou cupom");
        this.criarCupomService.criarCupom(formData);
      }
  }

}
