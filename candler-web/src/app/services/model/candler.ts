export class candler {
    //nome:string;
    public status:string;
    public id:string;
    public qrcode:string;

    constructor(_id, _qrcode, _status){
        //this.nome = _nome;
        this.id = _id;
        this.qrcode = _qrcode;
        this.status = _status;
    }

}