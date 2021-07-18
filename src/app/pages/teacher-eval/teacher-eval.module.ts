import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeacherEvalRouting } from './teacher-eval.routing';
import { QuestionComponent } from './question/question.component';

import { TeacherEvalRoutingModule } from './teacher-eval-routing.module';
import { ManagementComponent } from './management/management.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CheckboxModule} from 'primeng/checkbox';
import { GeneratePDFComponent } from './generate-pdf/generate-pdf.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';


@NgModule({
  declarations: [
    QuestionComponent,
    TeacherListComponent,
    
  ],
    imports: [
    CommonModule,
    FormsModule,
    TeacherEvalRouting,
    ManagementComponent,
    GeneratePDFComponent,
    TeacherEvalRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    CheckboxModule

  ]
})
export class TeacherEvalModule { }
// hola