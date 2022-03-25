import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientFeedbackDetailPage } from './client-feedback-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientFeedbackDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientFeedbackDetailPageRoutingModule {}
