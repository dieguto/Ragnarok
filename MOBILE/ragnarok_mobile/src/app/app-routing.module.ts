import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuardService } from './services/usuario/usuario-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [UsuarioGuardService]
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {path:'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
  { path: 'cadastro-jogo', loadChildren: './pages/cadastro-jogo/cadastro-jogo.module#CadastroJogoPageModule' },
  { path: 'selecao-tipo-anuncio', loadChildren: './pages/selecao-tipo-anuncio/selecao-tipo-anuncio.module#SelecaoTipoAnuncioPageModule' },
  { path: 'cadastro-console', loadChildren: './pages/cadastro-console/cadastro-console.module#CadastroConsolePageModule' },
  { path: 'cadastro-acessorio', loadChildren: './pages/cadastro-acessorio/cadastro-acessorio.module#CadastroAcessorioPageModule' },
  { path: 'home-modal', loadChildren: './pages/home-modal/home-modal.module#HomeModalPageModule' },
  { path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioPageModule' },
  { path: 'notificacoes', loadChildren: './pages/notificacoes/notificacoes.module#NotificacoesPageModule' },  { path: 'usuario-edit-modal', loadChildren: './pages/usuario-edit-modal/usuario-edit-modal.module#UsuarioEditModalPageModule' },
  { path: 'usuario-edit-jogos-modal', loadChildren: './pages/usuario-edit-jogos-modal/usuario-edit-jogos-modal.module#UsuarioEditJogosModalPageModule' },
  { path: 'usuario-edit-console-modal', loadChildren: './pages/usuario-edit-console-modal/usuario-edit-console-modal.module#UsuarioEditConsoleModalPageModule' },
  { path: 'direct', loadChildren: './pages/direct/direct.module#DirectPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'pesquisar-jogos', loadChildren: './pages/pesquisar-jogos/pesquisar-jogos.module#PesquisarJogosPageModule' },
  { path: 'jogo-pesquisa-modal', loadChildren: './pages/jogo-pesquisa-modal/jogo-pesquisa-modal.module#JogoPesquisaModalPageModule' }








];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
