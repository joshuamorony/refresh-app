import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDashboardPageRoutingModule } from './client-dashboard-routing.module';

import { ClientDashboardPage } from './client-dashboard.page';
import { ClientListComponentModule } from '../../ui/client-list/client-list.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDashboardPageRoutingModule,
    ClientListComponentModule,
  ],
  declarations: [ClientDashboardPage],
})
export class ClientDashboardPageModule {}
