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
        path: 'cadastro-console',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cadastro-console/cadastro-console.module').then(m => m.CadastroConsolePageModule)
          }
        ]
      },
      {
        path: 'cadastro-acessorio',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cadastro-acessorio/cadastro-acessorio.module').then(m => m.CadastroAcessorioPageModule)
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
        path: 'usuario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../usuario/usuario.module').then(m => m.UsuarioPageModule)
          }
        ]
      },
      {
        path: 'pesquisar-jogos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pesquisar-jogos/pesquisar-jogos.module').then(m => m.PesquisarJogosPageModule)
          }
        ]
      },
      {
        path: 'notificacoes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notificacoes/notificacoes.module').then(m => m.NotificacoesPageModule)
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
