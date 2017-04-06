import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ProdutosService } from './produtos/produtos.service';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { MenuComponent } from './menu/menu.component';
import { AngularFireModule } from 'angularfire2';
import { ProdutosComponent } from './produtos/produtos.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';

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
    ComprarProdutoComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [ProdutosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
