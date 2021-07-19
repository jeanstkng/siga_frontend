import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { PlanificationComponent } from './planification.component';


const routes: Routes = [
  {
    path: '',
    component: PlanificationComponent,
    canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanificationRoutingModule { }
