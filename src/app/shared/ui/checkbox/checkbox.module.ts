import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxComponentModule {}
