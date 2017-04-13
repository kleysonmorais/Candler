import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEmpresaService } from './../services/crud-empresa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuario = false;
  private empresa;
  emitirCadastro = new EventEmitter<boolean>();

  constructor(private router: Router, public crud: CrudEmpresaService) { }

  ngOnInit() {
    
  }

}
