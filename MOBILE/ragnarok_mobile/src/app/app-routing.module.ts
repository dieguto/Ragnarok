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
  { path: 'cadastro-anuncio', loadChildren: './pages/cadastro-anuncio/cadastro-anuncio.module#CadastroAnuncioPageModule' },
  { path: 'cadastro-anuncio', loadChildren: './pages/cadastro-anuncio/cadastro-anuncio.module#CadastroAnuncioPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
