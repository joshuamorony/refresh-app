import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../client-dashboard/client-dashboard.module').then(
        (m) => m.ClientDashboardPageModule
      ),
  },
  {
    path: 'add',
    loadChildren: () => import('../client-add/client-add.module').then( m => m.ClientAddPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientShellRoutingModule {}
