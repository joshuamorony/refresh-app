import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.page.html',
  styleUrls: ['./client-add.page.scss'],
})
export class ClientAddPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
