import { Component, OnInit } from '@angular/core';
import { CrudEmpresaService } from './../services/crud-empresa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario = false;

  constructor(public crud: CrudEmpresaService) {
    //var user = af.auth.getAuth();
    //console.log("Usário está: " + user);
  }

  onSubmit(formData) {
    this.crud.logar(formData);
  }

  ngOnInit() {}
}
