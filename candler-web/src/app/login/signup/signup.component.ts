import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../../animation/router.animations';

import { CrudEmpresaService } from './../../services/crud-empresa.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class SignupComponent implements OnInit {

  ngOnInit() {
  }

  constructor(public crud: CrudEmpresaService) {}

  onSubmit(formData) {
    //Armazena informações da empresa no banco    
    this.crud.onSubmitCadastrar(formData);
  }

}
