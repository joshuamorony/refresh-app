import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientSurveyPage } from './client-survey.page';

const routes: Routes = [
  {
    path: '',
    component: ClientSurveyPage
  },
  {
    path: ':index',
    loadChildren: () => import('../client-survey-detail/client-survey-detail.module').then( m => m.ClientSurveyDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientSurveyPageRoutingModule {}
