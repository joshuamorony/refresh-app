import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
})
export class CheckboxGroupComponentModule {}
