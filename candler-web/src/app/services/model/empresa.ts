import { Injectable } from '@angular/core';

@Injectable()
export class empresa {
  /* Informações Básicas da Empresa*/
  public nome:string;
  //private cnpj:string;
  private proprietario:string;
  //private endereco:string;
  private contato:string;

  /* Logar no Sistema como Empresa*/
  private email:string;
  private senha:string;
  private id:string;

  constructor(){
    console.log("Empresa");
  }

  getId(){
    return this.id;
  }

  getNome(){
    return this.nome;
  }

  getProprietario(){
    return this.proprietario;
  }

  getContato(){
    return this.contato;
  }

  getEmail(){
    return this.email;
  }

  setNome(_nome){
    this.nome = _nome;
  }

  setProprietario(_proprietario){
    this.proprietario = _proprietario;
  }

  setContato(_contato){
    this.contato = _contato;
  }

  setEmail(_email){
    this.email = _email;
  }

  setId(_id){
    this.id = _id;
  }

  setNull(){
    this.id = null;
    this.email = null;
    this.contato = null;
    this.nome = null;
    this.proprietario = null;
    this.senha = null;
  }
}
