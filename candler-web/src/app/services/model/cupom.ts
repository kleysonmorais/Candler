import { Injectable } from '@angular/core';

@Injectable()
export class cupom{
    public nome:string;
    private descricao:string;
    private id_empresa_mae:string;
    private valor:string;
    private id:string;

    atualizaCupom(_nome, _descricao, _id_empresa_mae, _valor, _id){
        console.log("Cupom inicializado");
        this.nome = _nome;
        this.descricao = _descricao;
        this.id_empresa_mae = _id_empresa_mae;
        this.valor = _valor;
        this.id = _id;
    }

}