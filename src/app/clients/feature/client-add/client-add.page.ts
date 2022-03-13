import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ClientsService } from '../../data-access/clients.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.page.html',
  styleUrls: ['./client-add.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddPage {
  clientForm = this.fb.group({
    name: this.fb.group({
      first: [''],
      last: [''],
    }),
    phone: [''],
    email: [''],
    notes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private clientsService: ClientsService
  ) {}

  saveClient() {
    this.clientsService.addClient(this.clientForm.value);
    this.navCtrl.navigateBack('clients');
  }
}
