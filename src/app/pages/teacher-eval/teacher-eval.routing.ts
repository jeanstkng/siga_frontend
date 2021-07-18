import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { QuestionComponent } from './question/question.component';
import { TeacherEvalComponent } from './teacher-eval.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';

const routes: Routes = [];
export const TeacherEvalRouting: Routes = [
  {
      path: '',
      children: [
          {
              path: '',
              component:TeacherEvalComponent
              //loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule),
              //canActivate:[AuthGuard]
            
          },
          {
            path: 'question',
            component:QuestionComponent
            //loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule),
            //canActivate:[AuthGuard] 
        },
        {
          path: 'teacher-list',
          component:TeacherListComponent
          //loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule),
          //canActivate:[AuthGuard] 
      },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TeacherEvalRoutingModule { }