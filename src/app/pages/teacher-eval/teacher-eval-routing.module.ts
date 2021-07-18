import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePDFComponent } from './generate-pdf/generate-pdf.component';
import { ManagementComponent } from './management/management.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { TypeEvaluationComponent } from './type-evaluation/type-evaluation.component';

const routes: Routes = [
  {
    path: 'prueba',
    component: ManagementComponent
  },
  {
    path: 'generate-pdf',
    component: GeneratePDFComponent
  },
  {
    path: 'evaluation',
    component: EvaluationComponent
  },
  {
    path: 'type-evaluation',
    component: TypeEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvalRoutingModule { }

// hola




