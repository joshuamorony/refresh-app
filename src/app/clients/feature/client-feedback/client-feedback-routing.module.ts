import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientFeedbackPage } from './client-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: ClientFeedbackPage
  },
  {
    path: ':id',
    loadChildren: () => import('../client-feedback-detail/client-feedback-detail.module').then( m => m.ClientFeedbackDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientFeedbackPageRoutingModule {}
