import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityReportComponent } from './activity-report.component';
import { ActivityReportRouting } from './activity-report.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ActivityReportRouting),
  ],
  declarations: [ActivityReportComponent]
})
export class ActivityReportModule { }
