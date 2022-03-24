import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.page.html',
  styleUrls: ['./client-feedback.page.scss'],
})
export class ClientFeedbackPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
