import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDetailPage } from './client-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailPage,
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('../client-add/client-add.module').then(
        (m) => m.ClientAddPageModule
      ),
  },
  {
    path: 'history',
    loadChildren: () => import('../client-survey/client-survey.module').then( m => m.ClientSurveyPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDetailPageRoutingModule {}
