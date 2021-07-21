import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentComponent } from './assignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { AssignmentRouting } from './assignment.routing';
import {CalendarModule} from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AssignmentRouting),
     FormsModule,
     ReactiveFormsModule,
     InputTextModule,
     ButtonModule,
     MessageModule,
     CalendarModule,
     AutoCompleteModule
  ],
  declarations: [AssignmentComponent]
})
export class AssignmentModule { }
