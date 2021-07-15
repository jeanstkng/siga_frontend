import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes  } from '@angular/router';
import { QuestionComponent } from './question.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

export const QuestionRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: QuestionComponent        
      }
    ]
  }

];

/*@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class QuestionRoutesModule{}*/
