import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard, visitaSelecionadaGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'seleciona-municipio',
    pathMatch: 'full',
  },
  {
    path: 'seleciona-municipio',
    loadChildren: () =>
      import('./pages/seleciona-municipio/seleciona-municipio.module').then(
        (m) => m.SelecionaMunicipioPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detalhe-pessoa',
    canActivate: [authGuard, visitaSelecionadaGuard],
    loadChildren: () => import('./pages/detalhe-pessoa/detalhe-pessoa.module').then(m => m.DetalhePessoaPageModule)
  },
  {
    // Abas "Visitas" (/inicio) e "Números de ordem" (/numeros-ordem)
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
