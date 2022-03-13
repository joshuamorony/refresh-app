import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.page.html',
  styleUrls: ['./client-add.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddPage {
  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
    email: [''],
    notes: [''],
  });

  constructor(private fb: FormBuilder, private navCtrl: NavController) {}

  saveClient() {
    console.log('hi');
    this.navCtrl.navigateBack('clients');
  }
}
