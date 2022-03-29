import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/feature/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/feature/client-shell/client-shell.module').then(
        (m) => m.ClientShellModule
      ),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feature/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'client-history/:id',
    loadChildren: () => import('./client-history/feature/client-history/client-history.module').then( m => m.ClientHistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
