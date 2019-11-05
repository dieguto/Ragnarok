import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioPage } from './usuario.page';


const routes: Routes = [
    {
      path: 'usuario',
      component: UsuarioPage,
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
  export class UsuarioPageRoutingModule {}