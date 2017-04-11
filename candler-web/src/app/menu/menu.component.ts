import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(
        (success) => {
          console.log(success + " Sucesso!");
          this.router.navigate(['/members']);
          //this.router.navigate(['/members']);
        }).catch(
        (err) => {
          console.log(err);
          console.log("Erro");
        })
    }
  }
}
