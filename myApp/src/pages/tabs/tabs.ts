import { Component } from '@angular/core';

//import { HomePage } from '../home/home';
import { MeusCuponsPage } from '../meus-cupons/meus-cupons';
import { ProgressoPage } from '../progresso/progresso';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //Define controller das tabs
  tab1Root: any = ProgressoPage;
  tab2Root: any = MeusCuponsPage;
  constructor() {

  }
}
