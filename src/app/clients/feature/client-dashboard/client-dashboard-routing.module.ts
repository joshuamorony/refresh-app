import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDashboardPage } from './client-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDashboardPageRoutingModule {}
