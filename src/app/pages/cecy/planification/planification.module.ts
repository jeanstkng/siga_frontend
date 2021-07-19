import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificationRoutingModule } from './planification-routing.module';
import { PlanificationComponent } from './planification.component';
// primeng
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    PlanificationComponent,
  ],
  imports: [
    CommonModule,
    PlanificationRoutingModule,
    TabViewModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    RadioButtonModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    AutoCompleteModule
  ]
})
export class PlanificationModule { }
