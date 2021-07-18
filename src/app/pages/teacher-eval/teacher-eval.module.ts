import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
import { TypeEvaluationComponent } from './type-evaluation/type-evaluation.component';
import { CoordinatorEvaluationComponent } from './type-evaluation/coordinator-evaluation/coordinator-evaluation.component';
import { CoordinatorHeteroevaluationComponent } from './type-evaluation/coordinator-heteroevaluation/coordinator-heteroevaluation.component';
import { CoevaluationAreaCoordinatorComponent } from './type-evaluation/coevaluation-area-coordinator/coevaluation-area-coordinator.component';
import { CoordinatorTeacherComponent } from './type-evaluation/coordinator-teacher/coordinator-teacher.component';
import { EvaluationComponent } from './evaluation/evaluation.component';


@NgModule({
  declarations: [
    ManagementComponent,
    GeneratePDFComponent,
    TypeEvaluationComponent,
    CoordinatorEvaluationComponent,
    CoordinatorHeteroevaluationComponent,
    CoevaluationAreaCoordinatorComponent,
    CoordinatorTeacherComponent,
    EvaluationComponent,
  
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
  ]
})
export class TeacherEvalModule { }
// hola