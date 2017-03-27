import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProgressoPage } from '../progresso/progresso';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //Define controller das tabs
  tab1Root: any = HomePage;
  tab2Root: any = ProgressoPage;
  constructor() {

  }
}
