import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth, AngularFire } from "angularfire2";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router, public af: AngularFire) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.af.auth.subscribe(auth => {
      if (auth) {
        console.log("permitiu! " + auth.uid );
        return true;
      }
    });
    this.router.navigate(['/home']);
    return false;
  }

  /*canActivate(): Observable<boolean> {
    return Observable.from(this.auth).take(1).map(state => !!state).do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/home']);
        console.log("Recusado");
      }else{
        console.log("Aceito");
      }
    })
  }*/

}