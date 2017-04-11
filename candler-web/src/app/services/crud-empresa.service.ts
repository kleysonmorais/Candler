import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';


@Injectable()
export class CrudEmpresaService {

  constructor(public af: AngularFire, private router: Router) { }

  logar(formData) {
    //Efetua o Login com uma conta existente    
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

  onSubmitCadastrar(formData) {
    //console.log("onSubmit");
    //console.log(formData.value.email);
    if (formData.valid) {
      console.log(formData.value);
      //Cria nova empresa no Firebase Auth
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
          this.cadastrarEmpresa(formData.value.nome, formData.value.proprietario, formData.value.contato);
          this.router.navigate(['/home'])
        }).catch(
        (err) => {
          console.log(err);
        })
    }
  }

  cadastrarEmpresa(nome, proprietario, contato) {
    //Cadastrar uma nova empresa
    //Método que adiciona informações extras à empresa
    var uid;
    this.af.auth.subscribe(auth => {
      //Verifica se usuário está logado
      if (auth) {
        uid = auth.uid;
        console.log("Id: " + uid);
        console.log("Nome: " + nome);
        console.log("Prop: " + proprietario);
        console.log("Contato: " + contato);
        //Estrutura do Json armazenada no banco
        this.af.database.object('empresa/' + uid + "/info_empresa").set({
            nome: nome,
            proprietario: proprietario,
            contato: contato
        });
      }
    });
  }

}
