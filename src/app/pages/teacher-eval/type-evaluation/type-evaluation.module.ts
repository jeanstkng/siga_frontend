import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeEvaluationRoutingModule } from './type-evaluation-routing.module';
import {CoevaluationAreaCoordinatorComponent} from './coevaluation-area-coordinator/coevaluation-area-coordinator.component';
import {CoordinatorEvaluationComponent} from './coordinator-evaluation/coordinator-evaluation.component';
import {CoordinatorHeteroevaluationComponent} from './coordinator-heteroevaluation/coordinator-heteroevaluation.component';
import {CoordinatorTeacherComponent} from './coordinator-teacher/coordinator-teacher.component';


@NgModule({
  declarations: [
    CoevaluationAreaCoordinatorComponent,
    CoordinatorEvaluationComponent,
    CoordinatorHeteroevaluationComponent,
    CoordinatorTeacherComponent
  ],

  imports: [
    CommonModule,
    TypeEvaluationRoutingModule
  ]
})
export class TypeEvaluationModule { }
