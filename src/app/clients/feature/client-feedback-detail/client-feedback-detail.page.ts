import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-feedback-detail',
  templateUrl: './client-feedback-detail.page.html',
  styleUrls: ['./client-feedback-detail.page.scss'],
})
export class ClientFeedbackDetailPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
