import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';

const APP_ROUTES: Routes = [
    {path: 'produtos', component: ProdutosComponent},
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
