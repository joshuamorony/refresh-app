import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-survey',
  templateUrl: './client-survey.page.html',
  styleUrls: ['./client-survey.page.scss'],
})
export class ClientSurveyPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
