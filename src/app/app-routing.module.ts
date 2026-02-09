import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'detalhe-pessoa',
    loadChildren: () => import('./pages/detalhe-pessoa/detalhe-pessoa.module').then(m => m.DetalhePessoaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
