import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ComprarProdutoComponent } from './comprar-produto/comprar-produto.component';

const APP_ROUTES: Routes = [
    {path: 'produtos', component: ProdutosComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'produto/:id', component: ComprarProdutoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
