import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSurveyDetailPage } from './client-survey-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSurveyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSurveyDetailPageRoutingModule {}
