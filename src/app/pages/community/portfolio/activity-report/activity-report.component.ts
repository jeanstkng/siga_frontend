import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/models/setting/paginator';

@Component({
  selector: 'community-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss']
})
export class ActivityReportComponent implements OnInit {
  paginator: Paginator;
  

  constructor() { }

  ngOnInit() {
  }

}
