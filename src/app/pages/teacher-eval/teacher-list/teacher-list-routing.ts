import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes  } from '@angular/router';
import { TeacherListComponent } from './teacher-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

export const TeacherListRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: TeacherListComponent        
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
