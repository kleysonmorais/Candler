import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

import { CrudEmpresaService } from './../services/crud-empresa.service';
import { empresa } from './../services/model/empresa';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  public usuario;
  //private empresa;
  private cadastrando = false;

  constructor(public crud: CrudEmpresaService, private router: Router, public empresa: empresa) {
    //Verificar se usuário está logado
    this.crud.verificarUsuarioLogin();
    
  }

  onSubmit(formData) {
    this.crud.logar(formData);
  }

  logout() {
     this.crud.logout();
     //this.usuario = false;
     console.log("Usuário NÃO logado");
  }

  cadastrarEmpresa(){
    this.router.navigateByUrl('/signup');
  }

  ngOnInit() {
    this.crud.emitirLogin.subscribe(
      status => {
        if(status) this.empresa = this.crud.getEmpresa();
        this.usuario = status;
      }
    );
    
    
  }
  
  

}
