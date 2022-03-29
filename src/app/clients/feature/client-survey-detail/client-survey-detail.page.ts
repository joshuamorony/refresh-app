import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-survey-detail',
  templateUrl: './client-survey-detail.page.html',
  styleUrls: ['./client-survey-detail.page.scss'],
})
export class ClientSurveyDetailPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
