import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtracreditsComponent } from './extracredits/extracredits.component';
import { GeneratePDFComponent } from './generate-pdf/generate-pdf.component';
import { InvestigationComponent } from './investigation/investigation.component';

import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  {
    path: 'matrix',
    component: ManagementComponent
  },
  {
    path: 'generate-pdf',
    component: GeneratePDFComponent
  },
  {
    path: 'extra-credit',
    component: ExtracreditsComponent
  },
  {
    path : 'investigation',
    component: InvestigationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherEvalRoutingModule { }

// hola




