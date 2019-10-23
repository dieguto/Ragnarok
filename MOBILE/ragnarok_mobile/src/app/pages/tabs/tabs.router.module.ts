import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'cadastro-jogo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cadastro-jogo/cadastro-jogo.module').then(m => m.CadastroJogoPageModule)
          }
        ]
      },
      {
        path: 'selecao-tipo-anuncio',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../selecao-tipo-anuncio/selecao-tipo-anuncio.module').then(m => m.SelecaoTipoAnuncioPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '../home/home.module',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
