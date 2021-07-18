import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Aplications Components
import {AppMainComponent} from '../../../../app/shared/components/main/app.main.component';
import {AppBlankComponent} from '../../../../app/shared/components/blank/app.blank.component';
import {CoevaluationAreaCoordinatorComponent} from './coevaluation-area-coordinator/coevaluation-area-coordinator.component';
import {CoordinatorEvaluationComponent} from './coordinator-evaluation/coordinator-evaluation.component';
import {CoordinatorHeteroevaluationComponent} from './coordinator-heteroevaluation/coordinator-heteroevaluation.component';
import {CoordinatorTeacherComponent} from './coordinator-teacher/coordinator-teacher.component';


const routes: Routes = [
  {
    // ruta de evaluacion de cordinador de area//
    path: 'coevaluation-area-coordinator',
    component: CoevaluationAreaCoordinatorComponent
  },
  {
     // ruta de evaluacion de autoridad a coordinador//
    path: 'coordinator-evaluation',
    component: CoordinatorEvaluationComponent
  },
  {
     // ruta de evaluacion de coordinador de carrera//
    path: 'coordinator-heteroevaluation',
    component: CoordinatorHeteroevaluationComponent
  },
  {
     // ruta de evaluacion coordinador a docente//
    path: 'coordinator-teacher',
    component: CoordinatorTeacherComponent
  }
  

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeEvaluationRoutingModule { }
