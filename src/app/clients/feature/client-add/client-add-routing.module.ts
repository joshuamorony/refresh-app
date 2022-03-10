import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientAddPage } from './client-add.page';

const routes: Routes = [
  {
    path: '',
    component: ClientAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientAddPageRoutingModule {}
