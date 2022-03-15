import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ClientListComponent } from './client-list.component';

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule],
  declarations: [ClientListComponent],
  exports: [ClientListComponent],
})
export class ClientListComponentModule {}
