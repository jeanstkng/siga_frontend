import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneratePDFComponent } from './generate-pdf/generate-pdf.component';

import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  {
    path: 'prueba',
    component: ManagementComponent
  },
  {
    path: 'generate-pdf',
    component: GeneratePDFComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvalRoutingModule { }

// hola




