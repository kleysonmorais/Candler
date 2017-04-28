import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';
import { LoginComponent } from './login/login/login.component';
import { EmailComponent } from './login/email/email.component';
import { SignupComponent } from './login/signup/signup.component';
import { MembersComponent } from './login/members/members.component';
import { AuthGuard } from './services/auth.service';
import { QrcodeComponent } from './page-extra/qrcode/qrcode.component';
import { CriarCupomComponent } from './page-extra/criar-cupom/criar-cupom.component';
import { MeuEspacoComponent } from './page-extra/meu-espaco/meu-espaco.component';

const APP_ROUTES: Routes = [
    {path: 'produtos', component: ProdutosComponent}, 
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'produto/:id', component: ComprarProdutoComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'criarCupom', component: CriarCupomComponent, canActivate: [AuthGuard] },
    { path: 'qr/:id', component: QrcodeComponent, canActivate: [AuthGuard] },
    { path: 'meuEspaco', component: MeuEspacoComponent, canActivate: [AuthGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
