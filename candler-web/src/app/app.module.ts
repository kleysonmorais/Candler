import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angular2-qrcode';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProdutosService } from './produtos/produtos.service';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { MenuComponent } from './menu/menu.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';
import { ComprarProdutoService } from './comprar-produto/comprar-produto.service';
import { LoginComponent } from './login/login/login.component';
import { EmailComponent } from './login/email/email.component';
import { SignupComponent } from './login/signup/signup.component';
import { MembersComponent } from './login/members/members.component';
import { AuthGuard } from './services/auth.service';
import { QrcodeComponent } from './page-extra/qrcode/qrcode.component';
import { CrudEmpresaService } from './services/crud-empresa.service';
import { empresa } from './services/model/empresa';
import { cupom } from './services/model/cupom';
import { CriarCupomComponent } from './page-extra/criar-cupom/criar-cupom.component';
import { CriarCupomService } from './page-extra/criar-cupom/criar-cupom.service';
import { MeuEspacoComponent } from './page-extra/meu-espaco/meu-espaco.component';
import { CrudCandlerService } from './services/crud-candler.service';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDPpBVfyDkEskpromg8Sy1zpoc02ZyjJCE",
    authDomain: "candler-a7b00.firebaseapp.com",
    databaseURL: "https://candler-a7b00.firebaseio.com",
    projectId: "candler-a7b00",
    storageBucket: "candler-a7b00.appspot.com",
    messagingSenderId: "532455404591"
};

@NgModule({
  declarations: [
    AppComponent,
    NovoCadastroComponent,
    MenuComponent,
    ProdutosComponent,
    HomeComponent,
    ComprarProdutoComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    QrcodeComponent,
    CriarCupomComponent,
    MeuEspacoComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    QRCodeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [ProdutosService, AuthGuard, CrudEmpresaService, empresa, CriarCupomService, cupom, ComprarProdutoService,
              CrudCandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
