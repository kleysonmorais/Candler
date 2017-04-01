import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  teste: FirebaseListObservable<any>;
  constructor(af: AngularFire){
    //this.teste = af.database.list("/teste");
    //console.log(queryObservable);
  }
}
