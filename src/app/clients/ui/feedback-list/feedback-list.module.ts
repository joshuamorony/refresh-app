import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackListComponent } from './feedback-list.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [FeedbackListComponent],
  exports: [FeedbackListComponent]
})
export class FeedbackListComponentModule {}
