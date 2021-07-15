import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

<<<<<<< HEAD
import { TeacherEvalRouting } from './teacher-eval.routing';
import { QuestionComponent } from './question/question.component';

=======
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
>>>>>>> origin/u_10_quinaluisa-david


@NgModule({
  declarations: [
<<<<<<< HEAD
    QuestionComponent,
    
  ],
  imports: [
    CommonModule,
    TeacherEvalRouting
=======
    ManagementComponent,
    GeneratePDFComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    TeacherEvalRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    CheckboxModule
>>>>>>> origin/u_10_quinaluisa-david
  ]
})
export class TeacherEvalModule { }
// hola