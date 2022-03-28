import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientHistoryPage } from './client-history.page';

const routes: Routes = [
  {
    path: '',
    component: ClientHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientHistoryPageRoutingModule {}
